import { Api } from "../api.js";
import { AddBook } from "./AddBook.js";
import { Home } from "./Home.js";

class StudentBook {
  constructor(student) {
    this.student = student;
    this.body = document.querySelector("body");
    this.book = "";
    this.api = new Api();
      this.aside = "";
      this.main = "";
      this.container = "";
    this.init();
    //this.main.removeEventListener("click", mainClk, true);
    this.main.addEventListener("click", this.mainAClk);
  }

  init = () => {
    this.body.innerHTML = `
                <header>
                    <h1>Biblioteca Online</h1>
                </header>
            
                <main>
                    <aside></aside>
                    <div id="container">
                        <div id="showbib"></div>
                    </div>    
                </main>
                <footer>Copyright </footer>     
        `;

    this.aside = document.querySelector("aside");
    this.main = document.querySelector("main");
    this.container = document.querySelector("#container");

    this.createMenu();
    this.container.innerHTML = `
        <div id="showstud">
            <p>Student: ${this.student.name}</p>
        </div>
        <div id="showbooks">
            <table id="biblio">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Year</th>
                        </tr>  
                    </thead>
            
                    <tbody>

                    </tbody>
            </table>
        </div>                
        
        `;
      
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = this.showBooks(this.student.books);
  };

refreshContent = () => {
    this.container.innerHTML = `
        <div id="showstud">
            <p>Student: ${this.student.name}</p>
        </div>
        <div id="showbooks">
            <table id="biblio">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Year</th>
                        </tr>  
                    </thead>
            
                    <tbody>

                    </tbody>
            </table>
        </div>                
        
        `;
      
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = this.showBooks(this.student.books);

}  

    refreshPage = async () => {
    try {
      let response = await this.refreshStud();
      this.student = response;
      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  refreshStud = async () => {
    try {
      let response = await this.api.getStudentBooks(this.student.email);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  showBooks = (lista) => {
    let content = ``;
    let cont = 0;
    lista.forEach((b) => {
      content += `
                <tr>
                    <th id="col1" scope="row">${++cont}</th>
                    <td>${b.title}</td>
                    <td>${b.author}</td>
                    <td>${b.genre}</td>
                    <td>${b.year}</td>
                    <td class="idhide">${b.id}</td>
                </tr>

             `;
    });
    return content;
  };

  createMenu = () => {
    this.aside.innerHTML = `
            <button class="bbtn home">Home</button>
            
            <button class="bbtn add">Add/Update Book</button>
            <button class="bbtn delete">Delete One Book</button>
        `;
  };

  delBook = async () => {
    try {
      let response = await this.api.deleteBook(this.student.id, this.book.id);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  mainAClk = async (e) => {
    let elm = e.target;
    if (elm.parentNode.parentNode.tagName == "TBODY") {
      let chld = elm.parentNode.children;
      let selId = chld[chld.length - 1].textContent;
      this.book = this.student.books.filter((a) => a.id == selId)[0];
    }
    if (elm.className == "bbtn home") {
      e.preventDefault();
      let hm = new Home();
    }

    if (elm.className == "bbtn add") {
      e.preventDefault();
      let adb = new AddBook(this.student, this.book);
    }
    if (elm.className == "bbtn delete") {
        e.preventDefault();
        console.log("ati apasat delete");
        let resp = await this.delBook();

        let resp2 = await this.refreshPage();
        this.book = "";

        this.refreshContent();
    }
  };
}

export { StudentBook };
