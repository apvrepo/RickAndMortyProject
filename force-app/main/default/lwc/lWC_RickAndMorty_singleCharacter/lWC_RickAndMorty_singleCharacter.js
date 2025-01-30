import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
// import USER_ID from '@salesforce/user/Id';
import getCharacterData from '@salesforce/apex/RickAndMortyHTTPService.getCharacterData';

export default class LWC_RickAndMorty_singleCharacter extends LightningElement {
    @track loaded = false;
    @track character;
  //  @track userId = USER_ID;
  @api recordId;


    // Wire the user record to get the selected favorite character ID
    @wire(getRecord, { recordId: '$recordId', fields: ['User.FavoriteCharacterId__c'] })
    wiredUser({ data }) {
        if (data) {
            const characterId = data.fields.FavoriteCharacterId__c.value;
            if (characterId) {
                // Call Apex to get character details by ID
                this.fetchCharacterData(characterId);
            }
        }
    }

    // LIFECYCLE HOOKS:
    connectedCallback() {
    }

    disconnectedCallback(){ 
    }

    // Method to fetch character data based on the characterId
    fetchCharacterData(characterId) {
        getCharacterData({ pageNumber: 1 }).then(characters => {
            const foundCharacter = characters.find(c => c.characterId === parseInt(characterId, 10));
            if (foundCharacter) {
                // Create a new object, copying the original character data and adding the statusClass
                this.character = {
                    ...foundCharacter,
                    statusClass: this.getStatusClass(foundCharacter.status)
                };
                this.loaded = true;
            }
        });
    }

    // Helper method to get the appropriate class for the character status
    getStatusClass(status) {
        return status === 'Alive' ? 'status-alive' : 'status-dead';
    }


}
