import React, { Component, Fragment } from "react";
import "./App.scss";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isDim:false,
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    } 
    this.toggleDim = this.toggleDim.bind(this)
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 600);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putMessageToDB = (message) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putMessage", {
      id: idToBeAdded,
      message: message,
    });
  };

  deleteFromDB = idTodelete => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === Number(idTodelete)) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach(dat => {
      if (dat.id === Number(idToUpdate)) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update:
        {
          message: updateToApply
        }
    });
  };

  toggleDim() {
    this.setState((prevState) => ({
      isDim: !prevState.isDim
    }));
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
      <div className="main">
        <div className="serch-wrapper schedule-add">
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="메모"
          />
          <div className="button-wrapper">
            <button 
              className="button add-button" 
              onClick={() => this.putMessageToDB(this.state.message)}>
              추가
            </button>
            <button 
              className="button modify-button"
              onClick={this.toggleDim}>
              변경
            </button>
          </div>
        </div>

        <div className={this.state.isDim ? 'dim-wraaper active' : 'dim-wraaper' }>
          <div className="fab-wrapper">
            <div className="serch-wrapper schedule-modify">
              <input
                type="text"
                onChange={e => this.setState({ idToUpdate: e.target.value })}
                placeholder="ID"
              />
              <input
                type="text"
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="메모"
              />
              <button
                className="button modify-button"
                onClick={() =>
                  this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                }>
                수정
              </button>
              <button
                className="button close-button"
                onClick={this.toggleDim}>
                닫기
              </button>
            </div>
            <div className="serch-wrapper schedule-remove">
              <input
                type="text"
                onChange={e => this.setState({ idToDelete: e.target.value })}
                placeholder="ID"
              />
              <strong className="target-remove">삭제 ID 입력</strong>
              <button 
              className="button remove-button"
              onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                삭제
              </button>
            </div>
          </div>
          <div className="dim" onClick={this.toggleDim}></div>
        </div>


        <div className="worklist-wrapper">
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.reverse().map((dat,i ) => (
            <div className="work-info"  key={i}>
              <span className="clip-cta">{dat.id}</span><p>{dat.message}</p>
            </div>
          ))}
        </div>
      </div>
      </Fragment>
    );
  }
}

export default App;