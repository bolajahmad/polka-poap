#[macro_export]
macro_rules! tests {
    ($contract:ident, $constructor:expr) => {
        mod _users_unit_tests {
            // Imports all the definitions from the outer scope
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

            fn build_contract() -> Users {
                $constructor()
            }

            fn default_accounts() -> test::DefaultAccounts<Environment> {
                ink::env::test::default_accounts::<Environment>()
            }

            fn advance_block() {
                ink::env::test::advance_block::<ink::env::DefaultEnvironment>();
            }

            #[ink::test]
            fn register_organizer_works() {
                let mut _events = build_contract();
                let accounts = default_accounts();
                let organizer = accounts.alice;
                let username = "jamaljones".as_bytes().to_vec();
                let _ = _events.create_organizer(organizer, username);
                assert_eq!(
                    _events.verify_organizer(organizer).unwrap(),
                    "jamaljones".as_bytes().to_vec()
                );
            }

            #[ink::test]
            fn register_existing_organizer_fails() {
                let mut _events = build_contract();
                let accounts = default_accounts();
                let organizer = accounts.alice;
                let username = "jamaljones".as_bytes().to_vec();
                let _ = _events.create_organizer(organizer, username);
                assert_eq!(
                    _events.verify_organizer(organizer).unwrap(),
                    "jamaljones".as_bytes().to_vec(),
                );

                advance_block();

                // try to create organizer again, should fail
                let username = "sillywilly001".as_bytes().to_vec();
                let result = _events.create_organizer(organizer, username);
                assert!(result.is_err(), "organizer should not exist");
            }
        }
    };
}
