class Api{
    api = (path,method="GET",body=null) => {
        let url = path;
        const options = {
            method,
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
}

    getallStudents =async () => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/stud", "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    
    }
    getAllBiblio = async () => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/biblio", "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    

    }
    getStudentBooks = async (student) => {
        try {
            
            let response = await this.api("http://localhost:8080/api/v1/biblio/filtStud/"+student.id, "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
    }
    
    addBookStud = async (student, book)=>{
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/"+student.id, "POST",book);
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
        
    }

    delBookStud = async (student, book) => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/"+student.id+"/"+book.id, "DELETE");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
        
        

    }
}

export { Api};