import React, {
    Component
}
from 'react';
import {
    render
}
from 'react-dom';

class Photo extends Component {

    render() {
        var idNum = "1";
        return ( < div className = "photo" >
            < img id = {
                this.props.id + idNum
            }
            src = {
                this.props.defaultImg
            }
            onClick = {
                this.props.clicky
            }
            />
     </div >
        )
    }
}


class Box extends Component {

    render() {
        return ( < div id = {
                this.props.id
            }
            className = "box" >
            < Photo id = {
                this.props.id
            }
            key = {
                this.props.id
            }
            defaultImg = {
                this.props.defaultImg
            }
            clicky = {
                this.props.clicky
            }
            />
        </div >
        )
    }
}

class Row extends Component {

    render() {
        var boxStr = 'box';
        let boxes = [];
        for (let i = 0; i < 3; i++) {
            boxes.push( < Box id = {
                    boxStr + i + this.props.id
                }
                key = {
                    boxStr + i + this.props.id
                }
                clicky = {
                    this.props.clicky
                }
                defaultImg = {
                    this.props.defaultImg
                }
                />);
    }

      return (
        <div id={this.props.id} className="row">
          {boxes}
        </div >
            )
        }
    }


    class Board extends Component {
        constructor(props) {
            super(props);
            this.clickState = this.clickState.bind(this);
            this.state = {
                whoisTurn: true
            };

            //make easy use of prop variables
            // this.drumpf = this.props.photo.Drumpf;
            // this.will = this.props.photo.Will;
            this.defaultImg = this.props.photo.defaultImg;
            this.player1 = this.props.photo.player1[Math.floor(Math.random() * this.props.photo.player1.length)]
            this.player2 = this.props.photo.player2[Math.floor(Math.random() * this.props.photo.player2.length)]

        }

        //efficient id getter
        getId(id) {
            return document.getElementById(id);
        }

        //click handler for changing state property 'whoisTurn'
        clickState(e) {
            var getIt = this.getId;
            if (this.state.whoisTurn) {
                this.setState({
                    whoisTurn: false
                });
                getIt('userTurn').innerHTML = 'Player1 insert your mascot!!';
                getIt(e.target.id).setAttribute('src', this.player1);
            } else {
                this.setState({
                    whoisTurn: true
                });
                getIt('userTurn').innerHTML = 'Player2 insert your mascot!!';
                getIt(e.target.id).setAttribute('src', this.player2);
            }
        }

        checkForWin() {
            var getIt = this.getId;
            var playerWon = false;
            var player1 = this.player1;
            var player2 = this.player2;
            var defaultImg = this.defaultImg;

            var boxIdxs = [
                ['box001', 'box011', 'box021'],
                ['box101', 'box111', 'box121'],
                ['box201', 'box211', 'box221'],
                ['box001', 'box101', 'box201'],
                ['box011', 'box111', 'box211'],
                ['box021', 'box121', 'box221'],
                ['box001', 'box111', 'box221'],
                ['box021', 'box111', 'box201'],
            ]

            var flattenedBoxes = boxIdxs.reduce(function(p, c) {
                return p.concat(c);
            })

            //checks if contents of each nested array are equivalent
            boxIdxs.forEach(function(ele) {
                if (ele.every(function(el) {
                    return getIt(el).getAttribute('src') === player2;
                })) {
                    playerWon = true;
                    alert('Your mascot wins!');
                    return location.reload();
                } else if (ele.every(function(el) {
                    return getIt(el).getAttribute('src') === player1;
                })) {
                    playerWon = true;
                    alert('Your mascot wins!')
                    return location.reload();
                }
            })

            //checks all box ids against default image,
            //and determines tie scenario
            if (flattenedBoxes.every(function(elem) {
                return getIt(elem).getAttribute('src') !== defaultImg;
            })) {
                if (!playerWon) {
                    alert('Tie! Play again!')
                    location.reload();
                }
            }
        }

        componentDidUpdate() {
            this.checkForWin();
        }

        render() {

            let rowArr = [];
            for (let i = 0; i < 3; i++) {
                rowArr.push( < Row id = {
                        i
                    }
                    key = {
                        i
                    }
                    clicky = {
                        this.clickState
                    }
                    defaultImg = {
                        this.defaultImg
                    }
                    / > )
}
      return (
        < div id = "board" >
          {rowArr}
        < /div >
                )
            }
        }


        class Timer extends Component {
            constructor() {
                super()
                this.tick = this.tick.bind(this);
                this.state = {
                    elapsed: 0
                }
            }


            componentDidMount() {
              this.timer = setInterval(this.tick, 1000);
              // console.log('hi', this.state.elapsed);
            }

            componentWillUnmount() {
              clearInterval(this.timer);
              // console.log('hi', this.state.elapsed);
            }

            tick() {
                this.setState({
                    elapsed: new Date() - this.props.start
                });

                if(this.state.elapsed > 1200000){
                  // alert('take a break!');
                }
              console.log('hi', this.state.elapsed);

            }

            render() {

              // console.log('hi', this.state.elapsed);
                var elapsed = Math.round(this.state.elapsed / 100);
                var seconds = (elapsed / 10).toFixed(0);

                return ( < p > Your pair started < b > {
                        seconds
                    }
                    seconds < /b> ago.</p >
                )

            }


        }

        class App extends Component {
            render() {
                    return ( < div id = 'app' > < Board photo = {
                            this.props.photo
                        }
                        />
                  <Timer start={Date.now()} / >
                        < /div>
                )
            }

        }


        var images = {
          defaultImg: 'http://4.bp.blogspot.com/-XV3YHQJsCvA/T31euZE_BzI/AAAAAAAAAU0/UaWQHvrrBYQ/s320/black%2B2.png ',
            player1: ['https: //www.askideas.com/media/48/Donald-Trump-Making-Funny-Face-Photo.jpg', 'http://www.funnyzozo.com/wp-content/uploads/2014/06/01874_127-576x576.jpg', 'http://www.dumpaday.com/wp-content/uploads/2014/04/funny-dogs-dressed-up-15.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPBJkdDfcTwSDMJSeJA6wi2_L1Jd9bVK53ftxj3vDC1990xyc', 'http://boredbug.com/wp-content/uploads/2015/09/funnydogs.jpg', 'http://londonbeep.com/wp-content/uploads/2015/04/Funny-Dog-Pictures-12.jpg', 'https://itfunnylife.files.wordpress.com/2008/06/funny-dogs-img_1.jpg', 'https://www.askideas.com/media/48/Donald-Trump-Making-Funny-Face-Photo.jpg'],
            player2: ['https://pbs.twimg.com/profile_images/440275647202484224/K0No0xDp.jpeg', 'https://lh3.googleusercontent.com/LeA1K5yE7G85Qc68-vqrn_C6v98vVaiocJ5Bfe3IXoDeVsIum2fzhY4TT7NcS-wMoMk=w300', 'http://dailynewsdig.com/wp-content/uploads/2014/07/Underwater-Dogs-Is-Back-With-More-Funny-Dog-Pictures-10.jpg', 'https://i.ytimg.com/vi/C6HHCUikD38/hqdefault.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQIa7xvx3Ef6r_yZG_IpgkzylsggA4xnnB6UK3880NrmT9GCmJ6xg', 'https://i.ytimg.com/vi/dGpZEuXoFWw/hqdefault.jpg', 'https://i.ytimg.com/vi/Ea8rOZyawIs/hqdefault.jpg', 'https://pbs.twimg.com/profile_images/440275647202484224/K0No0xDp.jpeg']
                    }

                    render( < App photo = {
                                images
                            }
                            / > , document.getElementById('content'));
