// @flow
import React from 'react';
import "./styles.css"
import Name from "./Name";
import Message from "./Message";
import PostDate from "./PostDate";

export type SocialResponse = {
  id: number | string,
  network: string
}

export type FacebookResponse = SocialResponse & {
  created_time: string,
  from: FacebookUser,
  message: string,
}

export type FacebookUser = {
  name: string,
}

export type InstagramResponse = SocialResponse & {
  caption: Caption,
}

export type Caption = {
  created_time: string,
  from: InstagramProfile,
  text: string,
}

export type InstagramProfile = {
  full_name: string,
}


export type TwitterResponse = SocialResponse & {
  created_at: string,
  text: string,
  user: User,
}

export type User = {
  name: string,
}

type Props = {
  data: SocialResponse
};

export default class Post extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.data.id !== nextProps.data.id;
  }


  prepareData() {
    let name = "";
    let date = "";
    let message = "";
    switch (this.props.data.network) {
      case "twitter": {
        const twitterResponse = ((this.props.data: any): TwitterResponse);
        name = twitterResponse.user.name;
        date = twitterResponse.created_at;
        message = twitterResponse.text;
        break;
      }
      case "facebook": {
        const facebookResponse = ((this.props.data: any): FacebookResponse);
        name = facebookResponse.from.name;
        date = facebookResponse.created_time;
        message = facebookResponse.message;
        break;
      }
      case "instagram": {
        const instagramResponse = ((this.props.data: any): InstagramResponse);
        name = instagramResponse.caption.from.full_name;
        date = Number(instagramResponse.caption.created_time) * 1000;
        message = instagramResponse.caption.text;
        break;
      }
    }
    return {
      name: name,
      date: date,
      message: message,
    }
  }

  render() {
    const data = this.prepareData();
    return (
      <div className="post">
        <Name name={data.name}/>
        <Message message={data.message}/>
        <PostDate date={data.date}/>
      </div>
    )
  }
}