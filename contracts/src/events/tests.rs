#[macro_export]
macro_rules! tests {
    ($contract:ident, $constructor:expr) => {
        mod activity_unit_tests {
            // Imports all the definitions from the outer scope so we can use them here.
            use super::super::*;
            use ink::env::test;

            type Event = <$contract as ::ink::reflect::ContractEventBase>::Type;

            // Gathers all emitted events, skip `shift` first, decode the rest and return as vector
            fn decode_events(shift: usize) -> Vec<Event> {
                test::recorded_events()
                    .skip(shift)
                    .map(|e| <Event as scale::Decode>::decode(&mut &e.data[..]).unwrap())
                    .collect()
            }

            const POLKAPOAP_WALLET: [u8; 32] = [6; 32];
            const COLLECTION_ID: u8 = !(1u8 << 7);
            fn default_accounts() -> test::DefaultAccounts<Environment> {
                ink::env::test::default_accounts::<Environment>()
            }

            fn build_contract() -> Events {
                let polkapoap_address = AccountId::from(POLKAPOAP_WALLET);
                $constructor(polkapoap_address)
            }

            fn assert_activity_updated_event(
                event: &Event,
                expected_event_date: u64,
                expected_mint_date: Option<u64>,
            ) {
                if let Event::ActivityUpdated(ActivityUpdated {
                    mint_date,
                    event_date,
                    ..
                }) = event
                {
                    assert_eq!(
                        mint_date, &expected_mint_date,
                        "encountered invalid ActivityUpdated.mint_date"
                    );
                    assert_eq!(
                        event_date, &expected_event_date,
                        "encountered invalid ActivityUpdated.event_date"
                    );
                } else {
                    panic!("Event is not ActivityUpdated")
                }
            }

            fn advance_block() {
                ink::env::test::advance_block::<ink::env::DefaultEnvironment>();
            }

            /// We test if the default constructor does its job.
            #[ink::test]
            fn new_works() {
                let _events = build_contract();
                assert_eq!(
                    _events.get_token_contract(),
                    AccountId::from(POLKAPOAP_WALLET)
                );
            }

            // We test a simple use case of our contract.
            #[ink::test]
            fn register_organizer_works() {
                let mut _events = build_contract();
                let accounts = default_accounts();
                let organizer = accounts.alice;
                let username = "jamaljones".as_bytes().to_vec();
                _events.register_organizer(organizer, username);
                assert_eq!(
                    _events.get_organizer(organizer),
                    "jamaljones".as_bytes().to_vec()
                );
            }

            #[ink::test]
            #[should_panic]
            fn register_existing_organizer_fails() {
                let mut _events = build_contract();
                let accounts = default_accounts();

                let username_1 = "jamaljones".as_bytes().to_vec();
                _events.register_organizer(accounts.alice, username_1);
                advance_block();
                let username_2 = "jamaljonesjnr".as_bytes().to_vec();
                _events.register_organizer(accounts.alice, username_2);
            }

            #[ink::test]
            fn register_participant() {
                let mut _events = build_contract();
                let accounts = default_accounts();

                let participant = accounts.bob;
                let username = "participant_jones".as_bytes().to_vec();
                let _ = _events.register_participant(participant, username);
                assert_eq!(test::recorded_events().count(), 1);
                assert_eq!(
                    _events.participants.get(&participant).unwrap(),
                    "participant_jones".as_bytes().to_vec()
                );
            }

            #[ink::test]
            #[should_panic]
            pub fn create_event_without_organizer_fails() {
                let event_date: u64 = 6843521668180;
                let mint_date: u64 = 20530565284836;

                let mut _events = build_contract();
                let _ = _events.create_new_event(COLLECTION_ID, event_date, mint_date);
                assert_eq!(test::recorded_events().count(), 0);
            }

            #[ink::test]
            pub fn create_event_works() {
                let event_date: u64 = 6843521668180;
                let mint_date: u64 = 20530565284836;

                let accounts = default_accounts();
                let organizer: AccountId = accounts.charlie;
                let org_name = "participant_jones".as_bytes().to_vec();

                let mut _events = build_contract();
                let _ = _events.register_organizer(organizer, org_name);
                assert_eq!(test::recorded_events().count(), 1);

                advance_block();
                test::set_caller::<Environment>(organizer);
                let response = _events.create_new_event(COLLECTION_ID, event_date, mint_date);

                assert!(response.is_ok());
                let event_id = match response {
                    Ok(id) => id,
                    _ => 0_u64,
                };
                assert_eq!(event_id, _events.event_count);
                assert_eq!(test::recorded_events().count(), 2);

                let events_list = decode_events(0);
                assert_activity_updated_event(&events_list[1], event_date, Some(mint_date))
            }

            #[ink::test]
            pub fn update_mint_date_works() {
                let event_date: u64 = 6843521668180;
                let mint_date: u64 = 20530565284836;

                let accounts = default_accounts();
                let organizer: AccountId = accounts.charlie;
                let org_name = "participant_jones".as_bytes().to_vec();

                let mut _events = build_contract();
                let _ = _events.register_organizer(organizer, org_name);
                advance_block();

                test::set_caller::<Environment>(organizer);
                let response = _events.create_new_event(COLLECTION_ID, event_date, mint_date);
                let event_id = match response {
                    Ok(id) => id,
                    _ => 0_u64,
                };
                advance_block();
                assert_eq!(
                    mint_date,
                    _events
                        .event_id_to_activity
                        .get(event_id)
                        .unwrap()
                        .mint_date,
                    "Mint date does not match"
                );

                let updated_mint_date = 20530565284882;
                let _ = _events.update_mint_date(updated_mint_date, event_id);
                advance_block();

                assert_eq!(
                    updated_mint_date,
                    _events
                        .event_id_to_activity
                        .get(event_id)
                        .unwrap()
                        .mint_date,
                    "Mint date should match"
                );
                assert_ne!(
                    mint_date,
                    _events
                        .event_id_to_activity
                        .get(event_id)
                        .unwrap()
                        .mint_date,
                    "Mint date should not match"
                );
            }

            #[ink::test]
            #[should_panic(expected = "UserDoesNotExist")]
            pub fn nonparticipants_apply_to_events_fails() {
                let mut _events = build_contract();
                let accounts = default_accounts();

                // register organizer
                let (organizer, org_name) = (accounts.charlie, "jamaljones".as_bytes().to_vec());

                _events.register_organizer(organizer, org_name);
                advance_block();

                let event_date: u64 = 32454251;
                let mint_date: u64 = 435261762;
                test::set_caller::<Environment>(organizer);
                let result = _events.create_new_event(COLLECTION_ID, event_date, mint_date);
                advance_block();
                let event_id = match result {
                    Ok(id) => id,
                    _ => 0_u64,
                };

                test::set_caller::<Environment>(accounts.alice);
                let _ = _events.register_participant_for_event(event_id);
            }

            #[ink::test]
            #[should_panic(expected = "EventDoesNotExist")]
            pub fn register_invalid_eventid_fails() {
                let accounts = default_accounts();
                let (participant, username) = (accounts.bob, "jamaljones".as_bytes().to_vec());

                let mut _events = build_contract();
                let _ = _events.register_participant(participant, username);
                advance_block();
                test::set_caller::<Environment>(participant);

                let _ = _events.register_participant_for_event(34_u64);
            }

            #[ink::test]
            pub fn registering_participant_works() {
                let accounts = default_accounts();
                let (participant, organizer, username, org_name) = (
                    accounts.bob,
                    accounts.charlie,
                    "jamaljones".as_bytes().to_vec(),
                    "organ_jones".as_bytes().to_vec(),
                );

                let mut _events = build_contract();
                _events.register_organizer(organizer, org_name);
                advance_block();
                test::set_caller::<Environment>(organizer);
                let event_date: u64 = 32454251;
                let mint_date: u64 = 435261762;
                let result = _events.create_new_event(COLLECTION_ID, event_date, mint_date);
                let _ = _events.register_participant(participant, username);

                advance_block();
                test::set_caller::<Environment>(participant);
                let event_id = match result {
                    Ok(id) => id,
                    _ => 0_u64,
                };
                let data = _events.event_to_participants.get(&event_id).unwrap();
                assert!(!data
                    .participants_registered
                    .iter()
                    .any(|&x| x == participant));

                let _ = _events.register_participant_for_event(event_id);
                let data = _events.event_to_participants.get(&event_id).unwrap();
                assert!(data
                    .participants_registered
                    .iter()
                    .any(|&x| x == participant));
            }
        }
    };
}
