import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요, 오늘 일정 알려드립니다.",
    },
    {
        id: 2,
        message: "점심 식사 시간입니다.",
    },
    {
        id: 3,
        message: "이제 곧 미팅이 시작됩니다.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [], // 생성자에서는 앞으로 사용할 데이터를 state에 넣어서 초기화함
        };
    }

    // 컴포넌트가 생성될 때
    componentDidMount() {
        const { notifications } = this.state;
        // 1초마다 정해진 작업 수행
        // 미리 만들어둔 알림 데이터 배열인 reservedNotifications로부터 알림 데이터를 하나씩 가져와서 state에 있는 notifications 배열에 넣고 업데이트함
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                this.setState({
                    notifications: [],
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    // 상위 컴포넌트에서 현재 컴포넌트를 더 이상 화면에 표시하지 않게 될 때
    componentWillUnmount() {
        // 기존에 타이머가 존재할 경우 clearInterval() 함수를 사용해서 제거
        if (timer) {
            clearInterval(timer);
        }
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return <Notification 
                                key={notification.id}
                                id={notification.id}
                                message={notification.message} />;
                })}
            </div>
        );
    }
}

export default NotificationList;