#![cfg_attr(not(feature = "std"), no_std, no_main)]

mod tests;

/*
** User management contract.
** This contract holds information about the different users existing on the platform.
*
*
** Storage
*
** organizers_by_id
** participants_by_id
*
** Functions
*
* verify_organizer
* create_organizer
*
*
 */
#[ink::contract]
mod users {
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    pub type HashByte = Vec<u8>;

    #[derive(Copy, Clone, Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        UserExists,
        UserNotFound,
    }

    #[ink(event)]
    pub struct UserUpdated {
        by: Option<AccountId>,
        updated_when: Option<u64>,
        user_hash: HashByte,
    }

    #[ink(storage)]
    pub struct Users {
        organizers_by_id: Mapping<AccountId, HashByte>,
        participants_by_id: Mapping<AccountId, HashByte>,
    }

    impl Users {
        /// Constructor that initializes the storage value(s)
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                organizers_by_id: Mapping::new(),
                participants_by_id: Mapping::new(),
            }
        }

        #[ink(message)]
        pub fn verify_organizer(&self, account: AccountId) -> Result<HashByte, Error> {
            let existing_user = self.organizers_by_id.get(&account);

            match existing_user {
                Some(hash) => Ok(hash),
                None => Err(Error::UserNotFound),
            }
        }

        #[ink(message)]
        pub fn create_organizer(
            &mut self,
            account: AccountId,
            hash: HashByte,
        ) -> Result<(), Error> {
            let existing_user = self.organizers_by_id.get(&account);

            match existing_user {
                Some(_) => Err(Error::UserExists),
                None => {
                    self.organizers_by_id.insert(account, &hash);
                    self.env().emit_event(UserUpdated {
                        by: Some(self.env().caller()),
                        updated_when: Some(self.env().block_timestamp()),
                        user_hash: hash,
                    });
                    Ok(())
                }
            }
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        crate::tests!(Users, Users::new);
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
            let constructor = UsersRef::default();

            // When
            let contract_account_id = client
                .instantiate("users", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get =
                build_message::<UsersRef>(contract_account_id.clone()).call(|users| users.get());
            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            Ok(())
        }

        /// We test that we can read and write a value from the on-chain contract contract.
        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = UsersRef::new(false);
            let contract_account_id = client
                .instantiate("users", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get =
                build_message::<UsersRef>(contract_account_id.clone()).call(|users| users.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            // When
            let flip =
                build_message::<UsersRef>(contract_account_id.clone()).call(|users| users.flip());
            let _flip_result = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // Then
            let get =
                build_message::<UsersRef>(contract_account_id.clone()).call(|users| users.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
