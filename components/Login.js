import { Api } from "../api.js";
import { Home } from "./Home.js";
import { StudentBook } from "./studentbook.js";

class Login { 

    constructor() {
        this.container = document.querySelector("#container");
        this.main = document.querySelector("main");
        this.stud = "";
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

    checkPass = async (n, p) => {
        let response = await this.api.chkPass(n, p);
        return response;
    }


    mainclk = async (e) => {
        e.preventDefault();
        console.log("--------sunt in main login-----------");
        let elem = e.target;
        if (elem.id == "btn_log_login") {
            e.preventDefault();
            let peml = document.querySelector("#name").value;  
            let ppas = document.querySelector("#pass").value;
            this.stud = await this.api.getStudentBooks(peml);
            if (this.stud.password == ppas) {
                this.main.removeEventListener("click", this.mainclk, true);
                let sb = new StudentBook(this.stud);
            } else {
                alert("n-a mers");
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