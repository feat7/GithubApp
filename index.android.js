import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Spinner, Content,
List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';

export default class GithubApp extends Component {

   constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modalVisible: false,
            search: 'feat7',
            selectedItem: undefined,
            results: {
                
            }
        }
    }

    componentDidMount() {
      this.search();
    }

    search() {

      this.setState({
          loading: true
      });
      var that = this;

      return fetch('https://api.github.com/users/'+this.state.search+'/starred')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                loading: false,
                results: responseJson
              })
              console.log(this.state);
              return responseJson.Search;
            })
            .catch((error) => {
              that.setState({
                loading: false
              })

              console.error(error);
            })
    }

    showList() {
      return (this.state.results.length > 0)  ? ( <List dataArray={this.state.results} renderRow={(item) =>
                                <ListItem avatar>
                                    <Left>
                                    <Thumbnail size={80} source={{uri: item.owner.avatar_url}} />
                                    </Left>
                                    <Body>
                                    <View><Text><Text style={{fontWeight: '100', color: '#111111'}}>{item.name}</Text></Text></View>

                                    <View><Text style={{color:'#007594'}}>{item.full_name}</Text></View>
                                    <View><Text note>{item.stargazers_count}<Text note style={{marginTop: 5}}> <Icon name='ios-star' style={{fontSize: 14}}/></Text></Text></View>
                                    </Body>
                                    <Right>
                                      <Icon name="ios-bookmark-outline" />
                                    </Right>
                                </ListItem> } />

              ) : <View><Text>Nothing was found</Text></View>;
    }

  render() {

    var that = this;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="logo-github" />
            <Input placeholder="Github Username" onChangeText={(text) => this.setState({search:text})}
             onSubmitEditing={() => this.search()} value={this.state.search} />
            <Icon name="ios-search" onPress={() => this.search()} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          { 
            this.state.loading ? <Spinner /> : this.showList()
          }
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('GithubApp', () => GithubApp);
