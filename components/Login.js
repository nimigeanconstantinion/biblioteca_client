import { Api } from "../api.js";
import { Home } from "./Home.js";

class Login { 

    constructor() {
        this.container = document.querySelector("#container");
        this.main = document.querySelector("main");
        this.listaStud = [];
        this.init();
        this.api = new Api();
        this.main.addEventListener("click",this.mainclk);
    }
    init = () => {
        this.container.innerHTML = ``;
        let aside = document.querySelector("aside");
        aside.innerHTML = `
        <button class="lbtn home">Home</button>
          
        `;
        
        this.container.innerHTML = `
        <form action="" id="frmlogin">

        <h2>Login Form</h2>
        
        <div class="getup">
            <label for="name">Email Address</label>
            <input type="email" name="name" id="name">

        </div>

        <div class="getup">
            <label for="pass">Password</label>
            <input type="password" name="pass" id="pass">
        </div>

        <button id="btn_log_login">Login</button>
        <button id="btn_log_cancel">Cancel</button>
    </form>        
        
         `;
    }

    loadStudents = async () => {
        try {
            this.listaStud= await this.api.getAllStudents();
                      
        } catch (e) {
            throw new Error(e);
        }
    }

    checkPass = (n, p) => {
        
        let pers = this.listaStud.filter(a => a.email == n && a.pass == p);
        if (pers.length==1) {
            return 1;
        } else {
            return 0;
        }
    }


    mainclk = async (e) => {
        e.preventDefault();
        
        let elem = e.target;
        if (elem.id == "btn_log_login") {
            e.preventDefault();
            let peml = document.querySelector("#name").value;  
            let ppas = document.querySelector("#pass").value;
            await this.loadStudents();
            let nr = this.lista.filter(a => a.name.includes(name));
            if (this.checkPass(peml, ppas)) {
                
            } else {
                
            }
        }

        if (elem.className == "lbtn home"||elem.id == "btn_log_cancel") {
            e.preventDefault();
            console.log("hkhjkkhkhkhkhkhkh");
            this.container.innerHTML = ``;
            
            let hm = new Home();
        }

    }


}

export { Login };