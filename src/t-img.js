/*
* TODO: fix issue on Firefox if webcomponent loader 
* background-src doesn't work because style get overlapping by other style. 
* styling in custom element should not in style
*/
export default class TImg extends HTMLElement {
	constructor() {
        super();
        this.src='';
        this.size='cover';
        this.position='top';
        this.rounded=false;
        this._shadowRoot=this.attachShadow({mode: 'open'});
        
	}
  
	static get observedAttributes() { return ['src','size','position','rounded']; }

	attributeChangedCallback(name, oldValue, newValue) {
		switch(name){
            case 'src':
                this.src = newValue;
                break;
            case 'size':
                this.size = newValue;
                break;
            case 'position':
                this.position = newValue;
                break;
            case 'rounded':
                this.rounded = newValue === null ? false : true;
                break;
		}
		this.render();
    }
    
    get template(){
        return `
        <style>
            :host{
                display:block;
            }
            .container{
                position:relative;
                height:100%;
            }
            .container .img{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
            }
        </style>
        <div class="container">
        <div class="img" style="border-radius:${this.rounded ? '100%' : '0'};background:transparent url(${this.src}) no-repeat;background-size:${this.size};background-position:${this.position};"></div>
        </div>
        `;
    }

	connectedCallback() {
		this.render();
	}
  
	get country() {
		return this._countryCode;
	}
	set country(v) {
		this.setAttribute('country', v);
	}
    
	render(){
        window.requestAnimationFrame(()=>{
            this._shadowRoot.innerHTML=this.template;
        });
	}
	
}