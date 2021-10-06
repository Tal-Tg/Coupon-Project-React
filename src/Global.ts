class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
        kittens: "http://localhost:8080/api/cats/",
        image: "http://localhost:8080/api/cats/images/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        kittens: "http://localhost:8008/api/kittens/",
        image: "http://localhost:8080/api/cats/images/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;