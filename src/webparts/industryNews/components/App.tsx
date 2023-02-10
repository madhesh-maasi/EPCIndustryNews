import * as React from "react";
import styles from "./IndustryNews.module.scss";

const App = (props) => {
  return (
    <div className={styles.industryNews}>
      <h3>Industry News</h3>
      <div className={styles.subTitleSection}>{props.subTitle}</div>
      <div className={styles.urlSection}>
        {props.linkOne && props.linkOne !== "" && (
          <div className={styles.url}>
            <a href={`${props.linkOne}`} target="_blank">
              {props.linkOneLabel && props.linkOneLabel !== ""
                ? props.linkOneLabel
                : "Click here"}
            </a>
          </div>
        )}
        {props.linkTwo && props.linkTwo !== "" && (
          <div className={styles.url}>
            <a href={`${props.linkTwo}`} target="_blank">
              {props.linkTwoLabel && props.linkTwoLabel !== ""
                ? props.linkTwoLabel
                : "Click here"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
