//Opção -> import JSONFormatter from 'json-formatter-js';

export default class JSONPrettyPrinter {

    printJSON (jsonOb){
        console.dir(jsonOb, {depth: null, colors: true})
        /*const formatter = new JSONFormatter(jsonOb);
        document.body.appendChild(formatter.render());*/
    }
}      