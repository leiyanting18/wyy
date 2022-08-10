// 集中管理vant组件的挂载

import {
    Form,
    Field,
    CellGroup,
    Swipe,
    SwipeItem,
    List,
    Popup
} from 'vant';

const plugins = [Form, Field, CellGroup, Swipe, SwipeItem, List, Popup]

export default function getVant(app) {
    plugins.forEach(function (x) {
        return app.use(x)
    })
}