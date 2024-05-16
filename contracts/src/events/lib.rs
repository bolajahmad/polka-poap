#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod events {
    use ink::env::call::{build_call, ExecutionInput, Selector};
    use ink::env::DefaultEnvironment;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[ink(event)]
    pub struct ActivityUpdated {
        #[ink(topic)]
        updated_by: AccountId,
        #[ink(topic)]
        event_id: u64,
        event_date: u64,
        last_updated: u32,
        mint_date: Option<u64>,
    }

    #[derive(Copy, Clone, Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        UserExists,
        CollectionAlreadyCreated,
        TokenMintingFailed,
    }

    pub type HashByte = Vec<u8>;
    pub type EventId = u64;
    pub type ContentIdentifier = u8;

    #[derive(scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(
            Debug,
            Clone,
            PartialEq,
            Eq,
            scale_info::TypeInfo,
            ink::storage::traits::StorageLayout,
        )
    )]
    pub struct Activity {
        event_date: u64,
        event_id: EventId,
        block_created: u32,
        collection_id: u8,
        created_by: AccountId,
        mint_date: u64,
    }

    #[derive(scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(
            Debug,
            Clone,
            PartialEq,
            Eq,
            scale_info::TypeInfo,
            ink::storage::traits::StorageLayout,
        )
    )]
    pub struct EventParticipants {
        participants_registered: Vec<AccountId>,
        participants_attended: Vec<AccountId>,
        participants_minted: Vec<AccountId>,
    }

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct Events {
        /// Stores the total number of events
        event_count: u64,
        event_id_to_activity: Mapping<EventId, Activity>,
        collection_ids: Vec<u8>,
        /// Stores a list of organizers on the platform
        organizers: Mapping<AccountId, HashByte>,
        event_to_participants: Mapping<EventId, EventParticipants>,
        // the poap NFT contract
        polkapoap: AccountId,
    }

    impl Events {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(polkapoap: AccountId) -> Self {
            let organizers = Mapping::new();
            Self {
                organizers,
                event_count: 0,
                collection_ids: Vec::new(),
                event_id_to_activity: Mapping::new(),
                event_to_participants: Mapping::new(),
                polkapoap,
            }
        }

        #[ink(message)]
        pub fn update_token_contract(&mut self, token: AccountId) {
            self.polkapoap = token;
        }

        #[ink(message)]
        pub fn get_token_contract(&self) -> AccountId {
            self.polkapoap
        }

        #[ink(message)]
        pub fn register_organizer(&mut self, organizer_id: AccountId, username: HashByte) {
            // ensure the organizer emain does not already exist
            assert!(
                self.organizers.get(&organizer_id).is_none(),
                "OrganizerExists"
            );
            // save organizer account and provided username to storage
            self.organizers.insert(organizer_id, &username);
        }

        #[ink(message)]
        pub fn get_organizer(&self, organizer_id: AccountId) -> HashByte {
            self.organizers.get(&organizer_id).unwrap()
        }
        #[ink(message)]
        pub fn register_participant(&mut self, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            // add the participant to the event mapping
            assert!(
                self.event_id_to_activity.get(&event_id).is_some(),
                "EventDoesNotExist"
            );
            let mut participants_data = self.event_to_participants.get(&event_id).unwrap();

            let is_participant_registered = participants_data
                .participants_registered
                .iter()
                .any(|&x| x == caller);
            assert!(!is_participant_registered, "UserAlreadyRegistered");

            participants_data.participants_registered.push(caller);
            Ok(())
        }

        #[ink(message)]
        pub fn create_new_event(
            &mut self,
            collection_id: u8,
            event_date: u64,
            mint_date: u64,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let current_block = self.env().block_number();
            assert!(
                self.organizers.get(&caller).is_some(),
                "Must be an Organizer"
            );

            let collection_exists = self
                .collection_ids
                .iter()
                .find(|collection: &&u8| collection == &&collection_id);

            match collection_exists {
                Some(_) => return Err(Error::CollectionAlreadyCreated),
                None => {
                    let event_length = self.event_count.checked_add(1_u64).unwrap_or(0);
                    // compile data for the new event and save to storage
                    let event = Activity {
                        block_created: current_block,
                        collection_id,
                        created_by: caller,
                        event_id: event_length,
                        mint_date,
                        event_date,
                    };
                    let participants = EventParticipants {
                        participants_registered: Vec::new(),
                        participants_attended: Vec::new(),
                        participants_minted: Vec::new(),
                    };
                    self.event_to_participants
                        .insert(event.event_id, &participants);
                    self.event_id_to_activity.insert(event.event_id, &event);
                    self.event_count = self.event_count.checked_sub(1).unwrap();
                    self.env().emit_event(ActivityUpdated {
                        updated_by: caller,
                        event_id: event.event_id,
                        mint_date: None,
                        event_date,
                        last_updated: current_block,
                    });
                    Ok(())
                }
            }
        }

        #[ink(message)]
        pub fn get_event_data(&self, event_id: EventId) -> Activity {
            self.event_id_to_activity.get(&event_id).unwrap()
        }
        #[ink(message)]
        pub fn update_mint_date(&mut self, mint_date: u64, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            let current_block = self.env().block_number();
            let organizer = self.organizers.get(caller);
            let selected_event = self.event_id_to_activity.get(&event_id);
            assert!(
                event_id <= self.event_count && selected_event.is_some(),
                "EventDoesNotExist"
            );

            if organizer.is_some() {
                let mut event = selected_event.unwrap();
                event.mint_date = mint_date;
                self.env().emit_event(ActivityUpdated {
                    updated_by: caller,
                    event_id: event_id,
                    mint_date: Some(mint_date),
                    event_date: event.event_date,
                    last_updated: event.block_created,
                });
                Ok(())
            } else {
                Err(Error::UserExists)
            }
        }

        #[ink(message, payable)]
        pub fn register_participant_for_event(&mut self, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            let current_block = self.env().block_number();
            let selected_event = self.event_id_to_activity.get(&event_id);
            assert!(
                event_id <= self.event_count && selected_event.is_some(),
                "EventDoesNotExist"
            );
            let mut participants_data = self.event_to_participants.get(&event_id).unwrap();
            let is_participant_registered = participants_data
                .participants_registered
                .iter()
                .any(|&x| x == caller);
            assert!(!is_participant_registered, "UserAlreadyRegistered");
            participants_data.participants_registered.push(caller);
            Ok(())
        }

        #[ink(message)]
        pub fn register_attendance_of_event(&mut self, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            let current_block = self.env().block_number();
            let selected_event = self.event_id_to_activity.get(&event_id);
            assert!(
                event_id <= self.event_count && selected_event.is_some(),
                "EventDoesNotExist"
            );

            let mut participants_data = self.event_to_participants.get(&event_id).unwrap();
            let is_attending = participants_data
                .participants_attended
                .iter()
                .any(|&x| x == caller);
            if is_attending {
                Ok(())
            } else {
                participants_data.participants_attended.push(caller);
                Ok(())
            }
        }

        /// Generate a token for the caller_address
        #[ink(message)]
        pub fn mint_event_token(&mut self, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            self.ensure_participant_attend(&event_id, &caller);
            self.ensure_its_mint_date(&event_id);
            self.ensure_has_not_minted(&event_id, &caller);

            let selected_activity = self.event_id_to_activity.get(&event_id).unwrap();
            self.is_new_collection(selected_activity.collection_id);

            /// mint NFT to user
            let result = self.execute_mint_message(caller, selected_activity.collection_id);
            match result {
                true => {
                    let mut event_participants = self.event_to_participants.get(&event_id).unwrap();
                    event_participants.participants_minted.push(caller);
                    self.collection_ids.push(selected_activity.collection_id);
                    Ok(())
                }
                false => Err(Error::TokenMintingFailed),
            }
        }

        #[ink(message)]
        pub fn get_event_participants(&self, event_id: EventId) -> EventParticipants {
            self.event_to_participants.get(&event_id).unwrap()
        }

        pub fn is_new_collection(&self, collection_id: ContentIdentifier) -> bool {
            let collection_exists = self
                .collection_ids
                .iter()
                .find(|collection: &&u8| collection == &&collection_id);

            match collection_exists {
                Some(_) => true,
                None => false,
            }
        }

        pub fn execute_mint_message(
            &self,
            owner: AccountId,
            proposal_cid: ContentIdentifier,
        ) -> bool {
            let mint_result = build_call::<DefaultEnvironment>()
                .call(self.polkapoap)
                .gas_limit(0)
                .exec_input(
                    ExecutionInput::new(Selector::new(ink::selector_bytes!("mint_property")))
                        .push_arg(&owner)
                        .push_arg(&proposal_cid),
                )
                .returns::<()>()
                .try_invoke();

            match mint_result {
                Ok(Ok(_)) => true,
                _ => false,
            }
        }

        /// Panic if it's not the mint_date yet
        fn ensure_its_mint_date(&self, event_id: &EventId) {
            assert!(
                self.event_id_to_activity.get(&event_id).unwrap().mint_date
                    >= self.env().block_number() as u64,
                "UnableToMintPOAP"
            )
        }

        fn ensure_participant_attend(&self, event_id: &EventId, participant: &AccountId) {
            let participants = self.event_to_participants.get(&event_id).unwrap();
            assert!(
                participants
                    .participants_attended
                    .iter()
                    .any(|&x| x == *participant),
                "UserNotAttended"
            )
        }

        fn ensure_has_not_minted(&self, event_id: &EventId, participant: &AccountId) {
            let participants = self.event_to_participants.get(&event_id).unwrap();
            assert!(
                !participants
                    .participants_minted
                    .iter()
                    .any(|&x| x == *participant),
                "UserAlreadyMinted"
            )
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        // Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        use ink::prelude::vec::Vec;

        // let mut POLKAPOAP_ADDRESS: AccountId = AccountId::from([0x1; 32]);

        // We test if the default constructor does its job.
        // #[ink::test]
        // fn constructor_works() {
        //     let events = Events::new(POLKAPOAP_ADDRESS);
        //     assert_eq!(events.get_token_contract(), POLKAPOAP_ADDRESS);
        // }

        // We test a simple use case of our contract.
        // #[ink::test]
        // fn register_user_works() {
        //     let mut events = Events::new(POLKAPOAP_ADDRESS);

        //     let organizer_address = AccountId::from("3PxAXgPUXzus5Vf6Hf2R1n8D6dL3V1X1PVHHtjTNwAKEMv7K");
        //     events.register_organizer(organizer_address, "123456");
        //     assert_eq!(events.get_organizer(organizer_address), "123456");
        //     // events.flip();
        //     // assert_eq!(events.get(), true);
        // }
    }

    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// A helper function used for calling contract messages.
        use ink_e2e::build_message;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = EventsRef::default();

            // When
            let contract_account_id = client
                .instantiate("events", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get =
                build_message::<EventsRef>(contract_account_id.clone()).call(|events| events.get());
            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            Ok(())
        }

        /// We test that we can read and write a value from the on-chain contract contract.
        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = EventsRef::new(false);
            let contract_account_id = client
                .instantiate("events", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get =
                build_message::<EventsRef>(contract_account_id.clone()).call(|events| events.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            // When
            let flip = build_message::<EventsRef>(contract_account_id.clone())
                .call(|events| events.flip());
            let _flip_result = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // Then
            let get =
                build_message::<EventsRef>(contract_account_id.clone()).call(|events| events.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
