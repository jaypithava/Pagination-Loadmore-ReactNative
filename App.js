import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({isLoading: true}, this.getData);
  }

  getData = async () => {
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' +
      this.state.page;
    await fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          data: this.state.data.concat(resJson),
          isLoading: false,
        });
      });
  };

  renderRow = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{uri: item.url}} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{'Id is : ' + item.id}</Text>
        <Text style={styles.itemTitle}>{'Title is : ' + item.title}</Text>
        {/* <Image source={{uri: item.thumbnailUrl}} style={styles.itemImage} /> */}
      </View>
    );
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1, isLoading: true}, this.getData);
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: 'cyan',
  },
  itemRow: {
    borderBottomColor: 'red',
    marginBottom: 10,
    borderBottomWidth: 4,
  },
  itemTitle: {
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
