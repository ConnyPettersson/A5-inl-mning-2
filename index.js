import express from 'express';
/* import expressHandlebars from 'express-handlebars'; */ //kopplad till rad 7
import { engine } from 'express-handlebars';
import fs from 'fs/promises';

const app = express();
/* app.engine('handlebars', expressHandlebars.engine()); */
app.engine('handlebars', engine());

// inställning för vilken motor vi vill använda som output
app.set('view engine', 'handlebars');

//inställning för var våra views är
app.set('views', './templates');


//Med menuItems ska vi konvertera varje objekt i arrayen till en HTML-sträng för varje objekt
const MENU = [
  {
    label: 'Home page',
    link: '/',
  },
  {
    label: 'About us',
    link: '/about',
  },
  {
    label: 'Contact us',
    link: '/contact',
  }, 
];



//byter ut kod från ex static och anger vilken view vi ska använda (about, contact eller index)
//så vi använder vår variabel page
async function renderPage(response, page) {
  const currentPath = (page == 'index') ? '/' : `/${page}`;

  //Skickar in hela arrayen ovan som vår template kan göra html av
  response.render(page, {
    menuItems: MENU.map(item => {
      return {
        active: currentPath == item.link,
        label: item.label,
        link: item.link,
      };
    }) 
  });
}

//3 stycken routes som kör funktionen renderPage ovan vid en HTTP-request
//Två parametrar, request och response. Efter en request ska det skrivas till responsen
app.get('/', async (request, response) => {
  renderPage(response, 'index');
});

app.get('/about', async (request, response) => {
  renderPage(response, 'about');
});

app.get('/contact', async (request, response) =>{
  renderPage(response, 'contact');
});

app.use("/static", express.static("./static"));
app.listen(3081);