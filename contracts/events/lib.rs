#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod events {
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Copy, Clone, Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        UserExists,
        CollectionAlreadyCreated,
    }

    pub type HashByte = Vec<u8>;
    pub type EventId = u64;

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
        /// Stores a single `bool` value on the storage.
        value: bool,
        /// Stores a list of organizers on the platform
        organizers: Mapping<AccountId, HashByte>,
        event_to_participants: Mapping<EventId, EventParticipants>,
    }

    impl Events {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            let organizers = Mapping::new();
            Self {
                value: init_value,
                organizers,
                event_count: 0,
                collection_ids: Vec::new(),
                event_id_to_activity: Mapping::new(),
                event_to_participants: Mapping::new(),
            }
        }

        /// Constructor that initializes the `bool` value to `false`.
        ///
        /// Constructors can delegate to other constructors.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
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
                    self.event_count = self.event_count + 1;
                    Ok(())
                }
            }
        }

        #[ink(message)]
        pub fn update_mint_date(&mut self, mint_date: u64, event_id: EventId) -> Result<(), Error> {
            let caller = self.env().caller();
            let organizer = self.organizers.get(caller);
            let selected_event = self.event_id_to_activity.get(&event_id);
            assert!(
                event_id <= self.event_count && selected_event.is_some(),
                "EventDoesNotExist"
            );

            if organizer.is_some() {
                let mut event = selected_event.unwrap();
                event.mint_date = mint_date;
                Ok(())
            } else {
                return Err(Error::UserExists);
            }
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
            assert_eq!(is_participant_registered, false, "UserAlreadyRegistered");

            participants_data.participants_registered.push(caller);
            Ok(())
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        // use super::*;

        /// We test if the default constructor does its job.
        // #[ink::test]
        // fn default_works() {
        //     let events = Events::default();
        //     assert_eq!(events.get(), false);
        // }

        /// We test a simple use case of our contract.
        // #[ink::test]
        // fn it_works() {
        //     let mut events = Events::new(false);
        //     assert_eq!(events.get(), false);
        //     events.flip();
        //     assert_eq!(events.get(), true);
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
