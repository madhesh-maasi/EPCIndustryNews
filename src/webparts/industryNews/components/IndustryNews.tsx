import * as React from "react";
import styles from "./IndustryNews.module.scss";
import { IIndustryNewsProps } from "./IIndustryNewsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../ExternalRef/CSS/Styles.css";
import App from "./App";
export default class IndustryNews extends React.Component<
  IIndustryNewsProps,
  {}
> {
  public render(): React.ReactElement<IIndustryNewsProps> {
    const subTitle = this.props.subTitle;
    const linkOne = this.props.linkOne;
    const linkTwo = this.props.linkTwo;
    const linkOneLabel = this.props.linkOneLabel;
    const linkTwoLabel = this.props.linkTwoLabel;

    return (
      <App
        subTitle={subTitle}
        linkOne={linkOne}
        linkTwo={linkTwo}
        linkOneLabel={linkOneLabel}
        linkTwoLabel={linkTwoLabel}
      />
    );
  }
}
