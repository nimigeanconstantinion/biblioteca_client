import { Api } from "../api.js";
import { Home } from "./Home.js";
import { StudentBook } from "./studentbook.js";

class Login { 

    constructor() {
        this.body = document.querySelector("body");
        this.container = "";
        this.main = "";
        this.messW = "";
        this.stud = "";
        this.init();
        this.container = document.querySelector("#container");
        this.main = document.querySelector("main");

        this.api = new Api();
        this.main.addEventListener("click",this.mainclk);
    
    }

    init = () => {
        this.body.innerHTML = `
        <body>
            <header>
                <h1>Biblioteca Online</h1>
            </header>
    
            <main>
                <aside>
                    <button class="abtn home">Home</button>
                    <button class="abtn login">Login</button>

                </aside>
                <div id="container"></div>    
            </main>
            <footer>Copyright </footer>
        </body>
        `;
        this.container = document.querySelector("#container");
        this.main = document.querySelector("main");

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

    addOOps = () => {
        let mess = document.createElement("div");
        mess.id = "divmessage";
        this.container.appendChild(mess);
        
        mess.innerHTML += `
            <h5>
                OOPs!!!
            </h5>
        `;

    }

    mainclk = async (e) => {
        e.preventDefault();
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
                this.addOOps();
                setTimeout(() => { 
                    this.messW = document.querySelector("#divmessage");
                    this.messW.innerHTML += `
                        <p> Login error!!!! </p>
                    `;
                }, 200);
                setTimeout(() => {
                    this.messW.style.opacity = 0;
                }, 1000);
                setTimeout(() => {
                    this.container.removeChild(this.messW);
                },2300);

                
            }            
        }

        if (elem.className == "lbtn home"||elem.id == "btn_log_cancel") {
            e.preventDefault();
            this.container.innerHTML = ``;
            
            let hm = new Home();
        }

    }


}

export { Login };