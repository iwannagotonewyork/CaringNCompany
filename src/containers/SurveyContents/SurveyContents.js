import React from 'react';
import './SurveyContents.css';
import SurveyHeader from './SurveyHeader/SurveyHeader';
import SurveyProgress from './SurveyProgress/SurveyProgress';
import SurveyQuestion from './SurveyQuestion/SurveyQuestion';
import SurveyButton from './SurveyButton/SurveyButton';
import {connect} from 'react-redux';

class SurveyContents extends React.Component {
    state = {
        errmsg: null,
        clicked: false,
        phone_number: '',
    }
    componentDidMount() {
        let page = this.props.match.params.questionNum;
        page = parseInt(page);
        if(page > 1) {  // 새로고침시 루트 페이지로 보내기.
            this.props.history.push('/');
        }
        if(page < 1) { //http://localhost:3000/survey/-3 이런식으로 injection을 넣어도 루트 페이지로 redirection.
            this.props.history.push('/');
        }
    }
    onChangeHandler = (event) => {
        this.setState({phone_number: event.target.value});
    }
    
    render() {
        // console.log(this.props.match.params.questionNum); //현재 이 라우터로 넘겨진 props의 question Number
        return (
            <div className="SurveyContents">
                <SurveyHeader questionNum={this.props.match.params.questionNum}/>  {/* 여기 각각에 3개의 인자를 넘겨줘서, SurveyHeader*/}
                <SurveyProgress questionNum={this.props.match.params.questionNum}/>
                <SurveyQuestion onChange={this.onChangeHandler} questionNum={this.props.match.params.questionNum}/>
                <SurveyButton questionNum={this.props.match.params.questionNum} phone_number_props={this.state.phone_number} props={this.props} routerProps={this.props}/>
                 {/* 다음 버튼을 누르는 순간 currentCategoryNum, 
                currentProgress, currentQuestionNum를 전부 증가시킨 후에, 
                survey/1/b로 라우터를 옮긴다. 그리고 다시 app에서 이 컴포넌트 SureyContents를 호출한다.
                그때는 이 컴포넌트의 state가 증가된 후이다.
                / 이전버튼을 누르면, 전부 1씩 감소시킨다음에 currentCatoryNum에 따라서 if 문으로 router를 결정해준다.
                */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        init_next_button: () => dispatch({type: 'INIT_NEXT_BUTTON'}),
    }
}
export default connect(null, mapDispatchToProps)(SurveyContents);