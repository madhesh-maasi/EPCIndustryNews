import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'IndustryNewsWebPartStrings';
import IndustryNews from './components/IndustryNews';
import { IIndustryNewsProps } from './components/IIndustryNewsProps';

export interface IIndustryNewsWebPartProps {
  description: string;
  subTitle:string;
  linkOne:string;
  linkOneLabel:string;
  linkTwo:string;
  linkTwoLabel:string;
  Title:string;
}

export default class IndustryNewsWebPart extends BaseClientSideWebPart<IIndustryNewsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IIndustryNewsProps> = React.createElement(
      IndustryNews,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        subTitle:this.properties.subTitle,
        linkOne:this.properties.linkOne,
        linkOneLabel:this.properties.linkOneLabel,
        linkTwo:this.properties.linkTwo,
        linkTwoLabel:this.properties.linkTwoLabel,
        Title:this.properties.Title
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          // header: {
          //   description: "Industry News"
          // }, 
          groups: [
            {
              // groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Title', {
                  label: "Title"
                }),
                PropertyPaneTextField('subTitle', {
                  label: "Sub Title",
                  multiline: true,
                  rows: 5
                })
                ,
                PropertyPaneTextField('linkOne', {
                  label: "Link One",
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('linkOneLabel', {
                  label: "Link One label",
                  
                }),
                PropertyPaneTextField('linkTwo', {
                  label: "Link Two",
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('linkTwoLabel', {
                  label: "Link Two label",
                  
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
