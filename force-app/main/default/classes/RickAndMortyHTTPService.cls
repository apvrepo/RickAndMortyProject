/**********************************************************************************
* Name:            RickAndMortyHTTPService.js
* Author:          Andres Pereyra
* Date:            12/09/24
* Description:     This is an Apex Class which is used by LWC and Flexcards handles the calls 
to the public Rick and Morty API Rest endpoint).

*** Credits: 
We are Axel Fuhrmann, a guy who likes to develop things and Talita, the "Rick and
Morty data scientist" and hardcore fan.
Rick and Morty is created by Justin Roiland and Dan Harmon for Adult Swim. 
The data and images are used without claim of ownership and belong to their 
respective owners.
This API is open source and uses a BSD license.
***********************************************************************************
* MODIFICATION LOG
* Version            Developer          Date               Description
* ------------------------------------------------------------------------------
* 1.0                Andres Pereyra     12 September 2024           Initial Creation 
* *********************************************************************************/

public class RickAndMortyHTTPService {
    @AuraEnabled(cacheable=true)
    public static List<CharacterData> getCharacterData(Integer pageNumber) {
        HttpRequest req = new HttpRequest();
        // Include pagination by appending the page number to the API URL
        req.setEndpoint('https://rickandmortyapi.com/api/character/?page=' + pageNumber);
        req.setMethod('GET');
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        List<CharacterData> characterDataList = new List<CharacterData>();
        
        if (res.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            List<Object> characters = (List<Object>) results.get('results');
            
            for (Object obj : characters) {
                Map<String, Object> charData = (Map<String, Object>) obj;
                CharacterData data = new CharacterData();
                data.name = (String) charData.get('name');
                data.status = (String) charData.get('status');
                data.location = (String) ((Map<String, Object>) charData.get('location')).get('name');
                
                // Handle the 'episode' field properly as a List of Objects
                List<Object> episodes = (List<Object>) charData.get('episode');
                if (episodes != null && episodes.size() > 0) {
                    data.firstSeenIn = (String) episodes[0]; // Cast the first episode URL as a String
                }
                
                // Fetch the image URL
                data.imageUrl = (String) charData.get('image');
                data.characterId = (Integer) charData.get('id'); // Fetch the character ID
                
                characterDataList.add(data);
            }
        }
        
        return characterDataList;
    }
    
    @AuraEnabled
    public static void saveFavoriteCharacterId(Id userId, Integer characterId) {
        User user = [SELECT Id, FavoriteCharacterId__c FROM User WHERE Id = :userId LIMIT 1];
        user.FavoriteCharacterId__c = String.valueOf(characterId); // Store characterId as a String
        update user;
    }

    public class CharacterData {
        @AuraEnabled public String name;
        @AuraEnabled public String status;
        @AuraEnabled public String location;
        @AuraEnabled public String firstSeenIn;
        @AuraEnabled public String imageUrl;
        @AuraEnabled public Integer characterId; // Add character ID field
    }
}