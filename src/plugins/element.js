import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Icon,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    RadioButton,
    RadioGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Switch,
    Pagination,
    Dialog,
    MessageBox

 } 
 from 'element-ui'


Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox
