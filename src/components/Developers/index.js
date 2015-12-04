import React, { Component } from 'react';

/* component styles */
import styles from './styles';

const DEVELOPERS = [{
  url: 'http://www.almnc.news',
  name: 'David Tsai',
  about: 'React forever.',
}, {
  url: 'http://www.almnc.news',
  name: 'Yoshio Goto',
  about: 'Climb Everest!',
}];

/* images */
const icons = [];
DEVELOPERS.map(developer => icons.push(require(`./files/${developer.name.replace(' ', '')}.png`)));

// const reactjs = require('./files/reactjs.png');

/**
 * TODO: Plan to add a list of Core Team member information to be rendered on the /about route.
 */

export class Developers extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                Core Team
              </h2>
            </div>
          </div>

          <div className="row">
          {
            DEVELOPERS.map((Developer, key) =>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-center"
                   key={key}>
                <a href={developer.url}>
                  <img src={icons[key]} />
                </a>
                <h4>
                  {developer.name}
                </h4>
                <p>
                  {developer.about}
                </p>
                <a href={developer.url}>
                  {developer.url.replace('http://', '')}
                </a>
              </div>
            )
          }
          </div>

        </div>
      </section>
    );
  }
}
