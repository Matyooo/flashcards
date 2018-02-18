export const SERVER_ADDR = "http://192.168.1.21:8080";

export const refreshList = (that) => {
    // get all cards from the server
    fetch(SERVER_ADDR + "/cards")
    .then((response) => response.json())
    .then((responseJson) => {
        that.setState({cards: responseJson});
        that.setState({disabledEditButton : that.state.cards.length < 1});
    })
    .catch ((error) => {
        alert(error);
    });        
}


