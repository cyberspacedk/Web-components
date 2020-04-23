// create a template of element
const template = document.createElement('template');

// get data from slots by use <slot name="attr name" />
template.innerHTML = `
  <style>
    .user-card {
      font-family: 'Arial', sans-serif;
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 15px;
      border-bottom: darkorchid 5px solid;
    }

    .user-card img {
      width: 100%;
    }

    .user-card button {
      cursor: pointer;
      background: darkorchid;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
    }
  </style>

  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email"/></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide info</button>
    </div>
  </div>
`

class UserCard extends HTMLElement{  

  constructor(){
    super();
  // define some status
    this.showInfo = true;
  // attach and paste element in shadow dom
    this.attachShadow({mode: 'open'}); 
    this.shadowRoot.appendChild(template.content.cloneNode(true));

  // get data from attr "name" and paste to H3
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');

  // get image url from attr avatar
    this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('avatar')) 
         
  }

  // create handler
  toggleInfo(){
     this.showInfo = !this.showInfo;

     const infoWrapper = this.shadowRoot.querySelector('.info');
     const toggleButton = this.shadowRoot.querySelector('#toggle-info');

     if(this.showInfo){
      infoWrapper.style.display = "block";
      toggleButton.innerText = 'Hide info'
     }else{
      infoWrapper.style.display = "none";
      toggleButton.innerText = 'Show info'
     }
  }

  // lifecycle method  will be called when element mounts
  connectedCallback(){
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', ()=> this.toggleInfo())
  }

  // lifecycle method which will be called when element removed 
  disconnectedCallback(){
    this.shadowRoot.querySelector('#toggle-info').removeEventListener()

  }
}

// create custom element <user-card />
window.customElements.define('user-card', UserCard)