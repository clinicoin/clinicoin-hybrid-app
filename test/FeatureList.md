Scenario: as a startup user, I want access
when a user first opens the app
and the app has no account set
then a registration interface is presented

Scenario: as a user, I want to register for an account
when a phone, email, password, backup phone, and password hint are entered
and a public/private key pair have been generated locally
and the email and phone are not active in the database
then an entry is created in the directory with the public key
and a login is created in IAM
and a queue is created for the user
and the user is given read/write rights to the queue
and the queue receives a welcome message from the directory

Scenario: as a user, I want to login
when the application opens
and the user enters a username/password combination
then the IAM interface validates them
and returns the queues they have access to
and the public key fingerprints of all connections (and the user) are compared
and any different key fingerprints are updated

Scenario: as a user, I want to connect with another user by scanning their qr code
when an app scans a qr code
and the qr code contains an identifiable clinicoin address at a directory server
then access to the public key is retrieved from the directory server
and the user enters a friendly name for the contact
and the contact is stored in the contact list
and the key stored in the client app

Scenario: as a user, I want to provide access to message me
when the user selects an access button
then a qr code is shown in the app containing the user's clinicoin address
and another user scans the provided qr code
and the app polls the directory for new connections
and displays a toast on new contact
and changes to the contact's message interface
(lots of future enhancements here, including connection rules, wallet, etc)

Scenario: as a user, I want to permanently remove my connection to another user
when the user selects to remove a contact
and the user has been duly prompted on irrevokability
then the contact entry is removed from the contact list
and the contact public key is deleted
and the contact is removed from the user's IAM queue list
and the user is removed from the contact's IAM queue list
and the connection removal requested in the user's directory server db to the contact
and the connection removal requested in the contact's directory server db to the user

Scenario: as a user, I want to hide a connection to a user, but still allow them to contact me
when a user selects to remove a contact
and the user chooses to hide rather than delete
then the contact entry is hidden on the contact list

Scenario: as a user, I want to send a message to a contact
when the user selects the contact
and the history of messages is displayed
and the user enters a message
then the message is encrypted with the contact's public key
and message contains a header identifying the key fingerprint
and placed on the contact's queue

Scenario: as a user, I want to change my keys
when the user selects to change keys
and the user has been duly prompted
and the user has re-entered the password for verification
and the user receives a text with a change token number/word
then a new public and private key are generated
and the directory is updated with the new public key

Scenario: as a user, I want to change my password
when the user selects to change their password
and has entered the prior password for verification
and has entered the new password twice
and the password is sufficiently strong
then a new public and private key are generated
and the directory is updated with the new public key
and IAM is updated with the new password

Scenario: as a user, I want to track health information
when the user selects to track information
and selects the type of data to enter (heart rate, weight, run time/distance, meditation time)
then the app stores that information locally

Scenario: directory is scanned to spam
when the directory receives a request
and the participant is not found
and the requesting user has made more than X requests in Y time
then the directory should lock out the user for X minutes

wallet?