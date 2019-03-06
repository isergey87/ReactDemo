//@flow
import * as React from 'react';
import type {SocialResponse} from "../Post/Post";
import Post from "../Post/Post";

type Prop = {
  url: string,
  numberOfPosts: number,
  updateInterval: number,
  numberParam: string,
}

type State = {
  data: SocialResponse[]
}

export default class Widget extends React.Component<Prop, State> {
  timer: ?IntervalID;
  url: string = "";

  constructor(props: Prop) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.url.indexOf("?") > 0) {
      this.url = `${this.props.url}&${this.props.numberParam}=${this.props.numberOfPosts}`;
    } else {
      this.url = `${this.props.url}?${this.props.numberParam}=${this.props.numberOfPosts}`;
    }

    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, this.props.updateInterval);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  fetchData() {
    return fetch(this.url)
      .then((result) => {
        if (result.ok) {
          return result.json()
            .then((json) => {
              return json.slice(0, this.props.numberOfPosts);
            });
        } else {
          Promise.reject(`Can't get url ${this.url} ${result.status} ${result.statusText}`);
        }
      });
  }

  getData() {
    this.fetchData()
      .then((result) => {
        this.setState({
          data: result
        });
      });
  }

  render() {
    let posts = <div/>;
    if (this.state.data) {
      posts = this.state.data.map<React.Node>((d) =>
        <Post key={d.id.toString()}
              data={d}
        />);
    }
    return (posts)
  }
}