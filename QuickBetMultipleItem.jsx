// @flow

import React, {
  Component,
} from 'react';
import radium from 'radium';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EventEmitter } from 'events';
import * as SelectionActions from '../../actions/Selection.js';
import * as MatchActions from '../../actions/Match.js';
import Theme from '../../styles/Theme.js';
import backBtn from '../../static/images/multiBack.png';
import notAllow from '../../static/images/icon-notAllow.png';

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Theme.MULTI_LIST_BACKGROUND,
    borderBottom: `0px solid ${Theme.MEMBER_PANEL_SPLIT_LINE}`,
  },
  main: {
    width: '100%',
    minHeight: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '6px 11px',
    position: 'relative',
  },
  notAllowColorBlock: {
    width: 0,
    height: '100%',
    backgroundColor: Theme.NOT_ALLOW_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  deleteWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    margin: '0 11px 0 0',
  },
  deleteText: {
    fontSize: 15,
    color: Theme.DELETE_COLOR,
    margin: 0,
  },
  notAllowImg: {
    width: '15px',
    marginLeft: 7,
  },
  infoWrapper: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  priceWrapper: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  backWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  inputWrapper: {
    width: 91,
    height: 36,
    borderRadius: 4,
    backgroundColor: Theme.STAKE_INPUT_BACKGROUND,
    border: `1px solid ${Theme.MEMBER_PANEL_SPLIT_LINE}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 10px',
    outline: 'none',
    cursor: 'pointer',
  },
  activedBorder: {
    border: `2px solid ${Theme.TITLE_TEXT}`,
  },
  stakeText: {
    fontSize: 15,
    margin: 0,
    color: Theme.DELETE_COLOR,
  },
  backText: {
    fontSize: 12,
    margin: '6px 0 0 0',
    color: Theme.MULTI_BET_SUB_TEXT,
    textAlign: 'right',
  },
  nameText: {
    fontSize: 14,
    margin: 0,
    color: Theme.MATCH_LIST_BACKGROUND,
  },
  headText: {
    fontSize: 14,
    margin: '0 0 0 8px',
    color: Theme.MATCH_LIST_BACKGROUND,
  },
  subText: {
    fontSize: 9,
    margin: 0,
    color: Theme.MULTI_BET_SUB_TEXT,
  },
  oddsText: {
    fontSize: 14,
    margin: '0 8px 0 0',
    color: Theme.BETTING_TEXT,
    position: 'absolute',
    top: 0,
    right: 91,
  },
  upJumpedOddsText: {
    backgroundColor: Theme.UP_JUMP_TEXT,
    color: Theme.WHITE,
    padding: '0 2px',
  },
  downJumpedOddsText: {
    backgroundColor: Theme.DOWN_JUMP_TEXT,
    color: Theme.WHITE,
    padding: '0 2px',
  },
  grayText: {
    color: '#9b9b9b',
  },
  arrow: {
    fontSize: 12,
    color: Theme.WHITE,
    padding: '0 2px',
  },
  keyboradWrapper: {
    width: '100%',
    height: 0,
    backgroundColor: Theme.KEYBOARD_BACKGROUND,
    transition: 'height 0.32s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shown: {
    height: 104,
    padding: '2px 0',
  },
  lineWrapper: {
    flex: 1,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 2,
  },
  activedLine: {
    display: 'flex',
  },
  numBtn: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    fontSize: 19,
    color: Theme.KEYBOARD_NUMBER_TEXT,
    margin: '0 1.5px',
    textAlign: 'center',
    padding: 0,
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  dotBtn: {
    flex: 3,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    fontSize: 19,
    color: Theme.KEYBOARD_NUMBER_TEXT,
    margin: '0 1.5px',
    textAlign: 'center',
    padding: 0,
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  deleteBtn: {
    flex: 3,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    backgroundImage: `url(${backBtn})`,
    backgroundSize: '32px 18px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '0 1.5px',
    padding: 0,
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  submitBtn: {
    flex: 3,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    fontSize: 15,
    fontWeight: 600,
    color: Theme.KEYBOARD_NUMBER_TEXT,
    textAlign: 'center',
    padding: 0,
    border: 0,
    cursor: 'pointer',
    position: 'relative',
    margin: '0',
    float: 'left',
    outline: 'none',
    lineHeight: '27px',
  },
  splitButton: {
    position: 'relative',
    textAlign: 'left',
    flex: 3,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    backgroundSize: '32px 18px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '0 1.5px',
    padding: 0,
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  dropBtn: {
    position: 'relative',
    margin: '0',
    float: 'left',
    outline: 'none',
    lineHeight: '27px',
    background: '#6e6e6f',
    border: '0px solid #E0E0E0',
    borderLeft: '0',
    height: '100%',
    borderRadius: 4,
    color: '#969696',
  },
  dropMenuOpen: {
    width: '100%',
    position: 'absolute',
    top: '50px',
    right: '0',
    display: 'block',
    float: 'left',
    margin: '0',
    fontSize: '14px',
    listStyle: 'none',
    backgroundClip: 'padding-box',
    flex: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.KEYBOARD_NUMBER_BACKGROUND,
    borderRadius: 4,
    backgroundSize: '32px 18px',
    border: 0,
    outline: 'none',
    cursor: 'pointer',
    padding: '0',
    textAlign: 'center',
    zIndex: '99999',
  },
  dropMenuClose: {
    display: 'none',
  },
  dropMenuText: {
    color: Theme.KEYBOARD_NUMBER_TEXT,
    lineHeight: '40px',
  },
};

type Props = {
  input: {
    onChange: Function,
    value: string,
  },
  removeSeletion: Function,
  SelectionId: number,
  MarketLineId: number,
  MatchId: number,
  MarketType: {
    BetTypeId: number,
    BetTypeName: string,
    MarketTypeId: number,
    PeriodId: number,
    PeriodName: string,
  },
  Participants: Array<string>,
  ParticipantId: number,
  SelectionTypeId: number,
  Odds: number,
  HeadValue: string,
  targetParticipant: {
    ImageUrl: string,
    Name: string,
    ParticipantId: number,
    RunnerType: number,
    Type: string,
  },
  targetParticipantHomeName: string,
  targetParticipantAwayName: string,
  match: {
    MatchId: number,
    SportId: number,
    MatchTime: string,
    ImageUrl: string,
    MarketLines: {},
    MatchResult: Array<string>,
    MatchStatus: number,
  },
  marketLine: {
    IsInPlay: boolean,
    MarketLineStatus: number,
    LastUpdateTime: number,
    MarketLineId: number,
    MarketType: {
      BetTypeId: number,
      BetTypeName: string,
      MarketTypeId: number,
      PeriodId: number,
      PeriodName: string,
    },
    Participants: Array<number>,
    Selections: Array<number>,
  },
  fetchSingleMatch: Function,
  i18n: {
    language: string,
  },
  t: Function,
  stakePerBet: Function,
  isAllow: number,
  oddsIsChanged: boolean,
  statusIsChanged: boolean,
  setStatusIsChanged: Function,
  selection: {
    SelectionStatus: number,
  },
}

type State = {
  isOpened: boolean,
  isMenuOpened: boolean,
  selected: boolean,
  jumpState: string,
}

class QuickBetMultipleItem extends Component {
  static toggleListener = new EventEmitter()
  static KEYBOARD_OPEN = 'QuickBetMultipleItem/KEYBOARD_OPEN'
  static QUICKBET_INPUT = 'QuickBetMultipleItem/QUICKBET_INPUT'

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      isMenuOpened: false,
      selected: false,
      jumpState: '',
      value: '',
    };

    this.opKeyboardOpen = () => {
      this.setState({
        isOpened: false,
        isMenuOpened: false,
      });
    };

    this.quickBetInput = (number) => {
      const {
        input: {
          onChange,
          value,
        },
      } = this.props;
      const {
        selected,
      } = this.state;
      if (value.match(/\./) && number === '.') return;
      if (!value && number === '.') return;
      if (value === '0' && number === 0) return;
      onChange(selected ? `${number}` : `${value}${number}`);
      this.setState({
        selected: false,
      });
    };
  }

  state: State

  componentWillMount() {
    const {
      fetchSingleMatch,
      i18n: {
        language,
      },
      MatchId,
      match,
      marketLine,
      Odds,
      removeSeletion,
      SelectionId,
    } = this.props;

    if (!match || !marketLine) {
      fetchSingleMatch({
        language,
        matchId: MatchId,
      });
    }

    if (!Odds) {
      removeSeletion(SelectionId);
    }
  }

  componentDidMount() {
    QuickBetMultipleItem.toggleListener.addListener(
      QuickBetMultipleItem.KEYBOARD_OPEN,
      this.opKeyboardOpen,
      QuickBetMultipleItem.QUICKBET_INPUT,
      this.quickBetInput,
    );
  }

  componentWillReceiveProps({
    Odds,
    match,
    marketLine,
    selection,
    statusIsChanged,
  }) {
    const {
      setStatusIsChanged,
      removeSeletion,
      SelectionId,
    } = this.props;

    if (Odds !== this.props.Odds) {
      if (Odds > this.props.Odds) {
        this.setState({ jumpState: 'up' });
      } else {
        this.setState({ jumpState: 'down' });
      }
    }

    if (this.props.match && this.props.marketLine && match && marketLine) {
      if (
        ((this.props.match.MatchStatus === 1 || this.props.match.MatchStatus === 2)
        && (match.MatchStatus === 3 || match.MatchStatus === 4 || match.MatchStatus === 5 || match.MatchStatus === 6))
        || ((this.props.marketLine.MarketLineStatus === 1 || this.props.marketLine.MarketLineStatus === 2)
        && (marketLine.MarketLineStatus === 3 || marketLine.MarketLineStatus === 4 || marketLine.MarketLineStatus === 5 || marketLine.MarketLineStatus === 6))
        || ((this.props.selection.SelectionStatus === 1 || this.props.selection.SelectionStatus === 2)
        && (selection.SelectionStatus === 3 || selection.SelectionStatus === 4 || selection.SelectionStatus === 5 || selection.SelectionStatus === 6))
        || !Odds
      ) {
        setStatusIsChanged();
      }
    }

    if (
      this.props.statusIsChanged
      && !statusIsChanged
      && ((match.MatchStatus === 3 || match.MatchStatus === 4 || match.MatchStatus === 5 || match.MatchStatus === 6)
      || (marketLine.MarketLineStatus === 3 || marketLine.MarketLineStatus === 4 || marketLine.MarketLineStatus === 5 || marketLine.MarketLineStatus === 6)
      || (selection.SelectionStatus === 3 || selection.SelectionStatus === 4 || selection.SelectionStatus === 5 || selection.SelectionStatus === 6))
    ) {
      removeSeletion(SelectionId);
    }
  }

  componentWillUnmount() {
    QuickBetMultipleItem.toggleListener.removeListener(
      QuickBetMultipleItem.KEYBOARD_OPEN,
      this.opKeyboardOpen,
      QuickBetMultipleItem.QUICKBET_INPUT,
      this.quickBetInput,
    );
  }

  getSelectionTypeName() {
    const {
      MarketType: {
        BetTypeId,
      },
      SelectionTypeId,
      t,
    } = this.props;
    switch (BetTypeId) {
      case 6: {
        switch (SelectionTypeId) {
          case 19:
            return '1：0';
          case 21:
            return '2：0';
          case 23:
            return '2：1';
          case 25:
            return '3：0';
          case 27:
            return '3：1';
          case 29:
            return '3：2';
          case 31:
            return '4：0';
          case 33:
            return '4：1';
          case 35:
            return '4：2';
          case 37:
            return '4：3';
          case 20:
            return '0：1';
          case 22:
            return '0：2';
          case 24:
            return '1：2';
          case 26:
            return '0：3';
          case 28:
            return '1：3';
          case 30:
            return '2：3';
          case 32:
            return '0：4';
          case 34:
            return '1：4';
          case 36:
            return '2：4';
          case 38:
            return '3：4';
          case 39:
            return '0：0';
          case 40:
            return '1：1';
          case 41:
            return '2：2';
          case 42:
            return '3：3';
          case 43:
            return '4：4';
          case 51:
            return t('ANY_OTHER_SCORE');

          default:
            return null;
        }
      }

      default:
        return null;
    }
  }

  getTitle() {
    const {
      MarketType: {
        BetTypeId,
      },
      targetParticipant,
      SelectionTypeId,
      t,
    } = this.props;

    switch (BetTypeId) {
      case 1:
        return targetParticipant.Name;

      case 2: {
        switch (SelectionTypeId) {
          case 4:
            return t('SELECTION_OVER');

          case 5:
            return t('SELECTION_UNDER');

          default:
            return null;
        }
      }

      case 3: {
        switch (SelectionTypeId) {
          case 3:
            return t('DREW');

          default:
            return targetParticipant.Name;
        }
      }

      case 7:
        return targetParticipant.Name;

      case 6:
        return this.getSelectionTypeName();

      default:
        return null;
    }
  }

  getHeadValue() {
    const {
      MarketType: {
        BetTypeId,
      },
      HeadValue,
    } = this.props;

    switch (BetTypeId) {
      case 1:
        return HeadValue;

      case 2:
        return HeadValue;

      default:
        return null;
    }
  }

  getBetTypeText() {
    const {
      MarketType: {
        BetTypeId,
      },
      t,
    } = this.props;

    switch (BetTypeId) {
      case 1:
        return t('ASIAN_HANDICAP');

      case 2:
        return t('OVER_UNDER');

      case 3:
        return t('ONE_X_TOW');

      case 7:
        return t('MONEY_LINE');

      case 6:
        return t('CORRECT_SCORE');

      default:
        return null;
    }
  }

  getPeriodName() {
    const {
      MarketType: {
        PeriodId,
      },
      t,
    } = this.props;

    switch (PeriodId) {
      case 1:
        return t('FULL_TIME');

      case 2:
        return t('FIRST_HALF_TIME');

      default:
        return null;
    }
  }

  type(number) {
    const {
      input: {
        onChange,
        value,
      },
    } = this.props;

    const {
      selected,
    } = this.state;

    if (value.match(/\./) && number === '.') return;
    if (!value && number === '.') return;
    if (value === '0' && number === 0) return;

    onChange(selected ? `${number}` : `${value}${number}`);

    this.setState({
      selected: false,
    });
  }


  back() {
    const {
      input: {
        onChange,
        value,
      },
    } = this.props;

    onChange(value.substring(0, value.length - 1));
  }

  keyUp(key) {
    switch (key) {
      case 48:
        this.type(0);
        break;

      case 49:
        this.type(1);
        break;

      case 50:
        this.type(2);
        break;

      case 51:
        this.type(3);
        break;

      case 52:
        this.type(4);
        break;

      case 53:
        this.type(5);
        break;

      case 54:
        this.type(6);
        break;

      case 55:
        this.type(7);
        break;

      case 56:
        this.type(8);
        break;

      case 57:
        this.type(9);
        break;

      case 190:
        this.type('.');
        break;

      case 8:
        this.back();
        break;

      default:
        break;
    }
  }

  openKeyboard() {
    const {
      isOpened,
    } = this.state;

    if (!isOpened) {
      QuickBetMultipleItem.toggleListener.emit(
        QuickBetMultipleItem.KEYBOARD_OPEN
      );
    }

    this.setState({
      isOpened: !isOpened,
      isMenuOpened: false,
    });
  }

  stakePerBet() {
    const {
      value,
    } = this.state;

    console.log('RAy', value);
    if (!Number(value)) {
      QuickBetMultipleItem.toggleListener.emit(
        QuickBetMultipleItem.QUICKBET_INPUT
      );
    }

    this.setState({
      value: value,
    });
  }

  props: Props

  render() {
    const {
      input: {
        value,
      },
      removeSeletion,
      SelectionId,
      targetParticipantHomeName,
      targetParticipantAwayName,
      Odds,
      t,
      oddsIsChanged,
      isAllow,
      match,
      marketLine,
      selection,
      stakePerBet,
    } = this.props;

    const {
      isOpened,
      isMenuOpened,
      jumpState,
    } = this.state;

    return (
      <div style={styles.wrapper}>






        <div style={styles.main}>
          {!isAllow ? (
            <div style={styles.notAllowColorBlock} />
          ) : null}
          <div style={styles.deleteWrapper} onClick={() => removeSeletion(SelectionId)}>
            <p style={styles.deleteText}>X</p>
          </div>
          <div style={styles.infoWrapper}>
            <div style={styles.titleWrapper}>
              <p
                style={[
                  styles.nameText,
                  match && (match.MatchStatus === 3 || match.MatchStatus === 4 || match.MatchStatus === 5 || match.MatchStatus === 6) && styles.grayText,
                  marketLine && (marketLine.MarketLineStatus === 3 || marketLine.MarketLineStatus === 4 || marketLine.MarketLineStatus === 5 || marketLine.MarketLineStatus === 6) && styles.grayText,
                  selection && (selection.SelectionStatus === 3 || selection.SelectionStatus === 4 || selection.SelectionStatus === 5 || selection.SelectionStatus === 6) && styles.grayText,
                ]}>
                {this.getTitle()}
              </p>
              <p
                style={[
                  styles.headText,
                  match && (match.MatchStatus === 3 || match.MatchStatus === 4 || match.MatchStatus === 5 || match.MatchStatus === 6) && styles.grayText,
                  marketLine && (marketLine.MarketLineStatus === 3 || marketLine.MarketLineStatus === 4 || marketLine.MarketLineStatus === 5 || marketLine.MarketLineStatus === 6) && styles.grayText,
                  selection && (selection.SelectionStatus === 3 || selection.SelectionStatus === 4 || selection.SelectionStatus === 5 || selection.SelectionStatus === 6) && styles.grayText,
                ]}>
               {this.getHeadValue()}  {!isAllow ? <img src={notAllow} style={styles.notAllowImg}/>: null}
              </p>
            </div>
            <p style={styles.subText}>{this.getPeriodName() + ' ' + this.getBetTypeText()}</p>
            <p style={styles.subText}>{targetParticipantHomeName} v {targetParticipantAwayName}</p>
          </div>




          <div style={styles.priceWrapper}>
            <p
              style={[
                styles.oddsText,
                match && (match.MatchStatus === 3 || match.MatchStatus === 4 || match.MatchStatus === 5 || match.MatchStatus === 6) && styles.grayText,
                marketLine && (marketLine.MarketLineStatus === 3 || marketLine.MarketLineStatus === 4 || marketLine.MarketLineStatus === 5 || marketLine.MarketLineStatus === 6) && styles.grayText,
                selection && (selection.SelectionStatus === 3 || selection.SelectionStatus === 4 || selection.SelectionStatus === 5 || selection.SelectionStatus === 6) && styles.grayText,
                oddsIsChanged && jumpState === 'up' && styles.upJumpedOddsText,
                oddsIsChanged && jumpState === 'down' && styles.downJumpedOddsText,
              ]}>
              {Odds}
              {oddsIsChanged && jumpState === 'down' ? (
                <span
                  className="fa fa-arrow-down"
                  style={styles.arrow} />
              ) : null}
              {oddsIsChanged && jumpState === 'up' ? (
                <span
                  className="fa fa-arrow-up"
                  style={styles.arrow} />
              ) : null}
            </p>




            <div style={styles.backWrapper} onKeyUp={e => this.keyUp(e.which)}>




              <button  /*相關連部分*/ 
                onClick={() => this.openKeyboard()}
                type="button"
                style={[
                  styles.inputWrapper,
                  isOpened && styles.activedBorder,
                ]}>
                <p style={styles.stakeText}>{Number(value) ? value : `${t('STAKE')}`}</p>
              </button>





              <p style={styles.backText}>
                {t('TO_RETURN')} {Number(value) ? Math.round(Odds * Number(value) * 100) / 100 : '0.00'}
              </p>
            </div>



          </div>
        </div>







        <div
          style={[
            styles.keyboradWrapper,
            isOpened && styles.shown,
          ]}>
          <div
            style={[
              styles.lineWrapper,
              isOpened && styles.activedLine,
            ]}>
            <button
              onClick={() => this.type(1)}
              type="button"
              style={styles.numBtn}>
              1
            </button>
            <button
              onClick={() => this.type(2)}
              type="button"
              style={styles.numBtn}>
              2
            </button>
            <button
              onClick={() => this.type(3)}
              type="button"
              style={styles.numBtn}>
              3
            </button>
            <button
              onClick={() => this.type(4)}
              type="button"
              style={styles.numBtn}>
              4
            </button>
            <button
              onClick={() => this.type(5)}
              type="button"
              style={styles.numBtn}>
              5
            </button>
            <button
              onClick={() => this.type(6)}
              type="button"
              style={styles.numBtn}>
              6
            </button>
            <button
              onClick={() => this.type(7)}
              type="button"
              style={styles.numBtn}>
              7
            </button>
            <button
              onClick={() => this.type(8)}
              type="button"
              style={styles.numBtn}>
              8
            </button>
            <button
              onClick={() => this.type(9)}
              type="button"
              style={styles.numBtn}>
              9
            </button>
            <button
              onClick={() => this.type(0)}
              type="button"
              style={styles.numBtn}>
              0
            </button>
          </div>
          <div
            style={[
              styles.lineWrapper,
              isOpened && styles.activedLine,
            ]}>
            <button
              onClick={() => this.type('.')}
              type="button"
              style={styles.dotBtn}>
              .
            </button>
            <button
              onClick={() => this.back()}
              type="button"
              style={styles.deleteBtn} />


            <span style={styles.splitButton}>
              <button
                onClick={() => this.setState({ isOpened: false })}
                type="button"
                style={styles.submitBtn}>
                {t('DONE')}
              </button>
              <button style={styles.dropBtn} type="button" onClick={() => this.setState({ isMenuOpened: !isMenuOpened })} >&#9660;</button>
              {isMenuOpened ? <ul style={styles.dropMenuOpen}><li><span style={styles.dropMenuText} onClick={() => stakePerBet()} >套用至其他投注</span></li></ul> : <ul style={styles.dropMenuClose}></ul>}
            </span>
          </div>
        </div>






      </div>
    );
  }
}

const reduxHook = connect(
  (state, {
    ParticipantId,
    Participants,
    MarketLineId,
    MatchId,
    SelectionId,
  }) => {
    const [
      targetParticipantHome,
      targetParticipantAway,
    ] = Participants.map(id => state.Participant.participants[id]);

    return {
      targetParticipant: state.Participant.participants[ParticipantId] || null,
      targetParticipantHomeName: targetParticipantHome ? targetParticipantHome.Name : '',
      targetParticipantAwayName: targetParticipantAway ? targetParticipantAway.Name : '',
      match: state.Match.matchs[MatchId],
      marketLine: state.MarketLine.marketLines[MarketLineId],
      selection: state.Selection.selections[SelectionId],
    };
  },
  dispatch => bindActionCreators({
    ...SelectionActions,
    ...MatchActions,
  }, dispatch),
);

export default translate()(
  reduxHook(
    radium(
      QuickBetMultipleItem
    )
  )
);
