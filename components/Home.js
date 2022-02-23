import { Api } from "../api.js";
import { Login } from "./Login.js";



class Home{

    constructor() {
        this.container = document.querySelector("#container");
        this.aside = document.querySelector("aside");
        this.main = document.querySelector("main");
        this.init();
        this.main.addEventListener("click", this.mainClk);
        
    }


    init = () => {
        this.aside.innerHTML = `
        <button class="abtn home">Home</button>
        <button class="abtn login">Login</button>
        
        
        `;
        this.initContainer();


    }

    initContainer=()=>{
        this.container.innerHTML = '';
    }

    mainClk = (e) => {
        let elm = e.target;
        if (elm.className == "abtn login") {
            e.preventDefault();
            let lg = new Login();
        }

    }


}

export { Home};