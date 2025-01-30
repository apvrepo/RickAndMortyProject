# Rick & Morty API Project

This project is an integration with the Rick and Morty API, a REST-based service that provides access to a vast collection of characters, images, locations, and episodes from the popular television show Rick and Morty. The API contains canonical information directly sourced from the series, ensuring accuracy and consistency with the show's universe.

As part of this integration, users can select their favorite character, which is then stored and automatically retrieved upon accessing their specific User Record Page. This feature enhances personalization by allowing users to engage with their preferred characters seamlessly within the platform.

## Copyrights to whoever may correspond.

🥒 Rick and Morty© - Rick and Morty is created by Justin Roiland and Dan Harmon for Adult Swim. 
The data and images are used without claim of ownership and belong to their respective owners.
This API was created by Axel Fuhrmann and Talita, is open source and uses a BSD license.
Salesforce implementation: Andres Pereyra  

## More Information:  

https://rickandmortyapi.com/ 

https://rickandmortyapi.com/about

https://en.wikipedia.org/wiki/Justin_Roiland 

https://en.wikipedia.org/wiki/Dan_Harmon


## 📷 Screen captures of my short API Rest Integration Demo!

![IMG01](https://github.com/user-attachments/assets/a95d7feb-758d-4734-8371-795f943521e6)

![IMG02](https://github.com/user-attachments/assets/4f23f15f-376c-47db-b1f8-539308c4683b)

![IMG03](https://github.com/user-attachments/assets/b343a81b-699c-4a77-b9b0-790dea1abec4)

![IMG04](https://github.com/user-attachments/assets/18c6ecb1-d653-43ff-a00b-7131f64864d0)


## POST-DEPLOY Manual Steps:

### Activate App: 

1- Go to SETUP --> Apps --> App Manager

2- Find the App with Developer Name = 'SchwiftyApp' then click the option 'Edit' of it.

3- On the App Settings column, select the tab 'User Profiles' then add the profiles that you want to allow to see the App (Suggestion 'System Administrator', 'Standard User', and 'Standard Platform User')

4- Make Sure the changes are saved

5- Go back to the main Home page and Refresh the web browser tab (CTRL + F5)

6- Finally you can go to the 'App Launcher' and you should be able to see the new App 'Arcade'


### Make custom field visible: 

1- Go to SETUP --> Object Manager --> User --> Fields & Relationships

2- Search on the quick find box for a field with 'Field Name' =  FavoriteCharacterId__c , then click on its field label.

3- Click on the button 'Set Field-Level Security'

4- Make Sure to check the 'Visible' option for every profile or at least for 'System Administrator', 'Standard User', and 'Standard Platform User'.

5- Click 'Save'

6- Go back to the main Home page and Refresh the web browser tab (CTRL + F5)


### Assign Custom Permission Set to Users: 

1- Go to SETUP --> Users --> Permission Sets

2- Click on the permission set with label 'CustomTabPermissionSet'

3- Click on the button 'Manage Assignments'

4- Click on the button 'Add Assignments'

5- Select those users that you want to be able to see the Custom Tab 'Rick & Morty' and then click  'Next', after that click the button 'Assign'

6- Go back to the 'SchwiftyApp' page and Refresh the web browser tab (CTRL + F5) a couple of times.
