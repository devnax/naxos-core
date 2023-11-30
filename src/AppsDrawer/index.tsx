import Layer from 'naxui/Layer'
import Menu from 'naxui/Menu'
import AppsDrawerView from './View'

class AppsDrawer {
    open() {
        Menu.close()
        Layer.open("OS_APPS_DRAWER", AppsDrawerView, {
            blur: 20
        })
    }

    close() {
        Layer.close("OS_APPS_DRAWER")
    }
}

export default new AppsDrawer