import { LightningElement, wire, track } from 'lwc';
import getCharacterData from '@salesforce/apex/RickAndMortyHTTPService.getCharacterData';
import saveFavoriteCharacterId from '@salesforce/apex/RickAndMortyHTTPService.saveFavoriteCharacterId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id'; // To fetch current user's ID

export default class LWC_RickAndMorty_characters extends LightningElement {
    @track loaded = false;
    @track characters;
    @track characters;
    @track pageNumber = 1;
    @track userId = USER_ID; // Get the current user's Id

    // LIFECYCLE HOOKS:
    connectedCallback() { }

    renderedCallback() { }

    // Wire the Apex method to fetch character data
    @wire(getCharacterData, { pageNumber: '$pageNumber' })
    wiredCharacters({ error, data }) {
        if (data) {
            // Process each character to add a status class
            this.characters = data.map(character => {
                return {
                    ...character,
                    statusClass: character.status === 'Alive' ? 'slds-icon-custom-custom1 status-alive' : 'slds-icon-custom-custom5 status-dead'
                };
            });
            this.loaded = true;
        } else if (error) {
            console.error(error);
        }
    }

    // Getter to disable the "Previous" button if pageNumber is 1
    get isPreviousDisabled() {
        return this.pageNumber === 1;
    }

    handleNextPage() {
        this.loaded = false;
        this.pageNumber++;
    }

    handlePreviousPage() {
        this.loaded = false;
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }

    handleSelect(event) {
        const characterId = event.target.dataset.id;
        saveFavoriteCharacterId({ userId: this.userId, characterId })
            .then(() => {
                this.showToast('Success', 'Favorite character saved successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', 'Failed to save favorite character', 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

}