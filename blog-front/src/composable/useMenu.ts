import type { Ref, Component } from 'vue'
/**
 *  Ref
 * Ref 是一个可以设定自己声明定义的ref对象的类型，并且覆盖默认推导参数类型的行为， 传入的参数是一个泛型， 用来指定ref对象中参数的类型
 */

import { h, ref, watch } from 'vue'
import { NIcon } from 'naive-ui';
import routes from '@/router/routes'
import { useRoute, RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
/**
 * RouteRecordRaw
 * RouteRecordRaw 是一个接口类型，用于描述单个路由记录的配置信息。每个路由记录都包含了路径、对应的组件、嵌套的子路由等信息。
 */

/**
 * useRoute
 * 返回当前的路由地址。相当于在模板中使用 $route。
 */

/**
 * RouterLink
 * 用于在应用中声明式导航。相当于在模板中使用 <router-link>。
 */

export interface UseMenu {
  /**
   * 菜单选项
   */
  menuOptions: Ref<MenuOption[]>;
  /**
   * 展开的子菜单标识符数组
   */
  expandKeys: Ref<string[]>;
  /**
   * 更改子菜单标识符数组回调方法
   */
  updateExpandKeys: (keys: String[]) => void;
  /**
   * 当前选中的菜单
   */
  currentMenu: Ref<string>;
  /**
   * 修改选中菜单时的回调方法
   */
  updateValue: (key: string) => void
}

/**
 * 渲染菜单ICON
 * @param {Component} icon 菜单ICON
 * @returns {()=>VNode} 返回一个函数，该函数返回一个VNode
 */

const renderIcon = (icon: Component) => {
  return ()=> h(NIcon, null, { default: () => h(icon) })
}

/**
 * 判断路由是否只有一个子路由
 * @param route 路由信息
 * @returns {boolean} 如果只有一个子路由则返回true；否则返回false
 */

const isSingleChildren = (route: RouteRecordRaw): boolean => {
  return route?.children?.length === 1
}

/**
 * 过滤路由配置中需要在菜单中隐藏的路由
 * @param routes 路由信息
 * @returns {RouteRecordRaw[]} 路由列表
 */
const filterHiddenRouter = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.filter((item: RouteRecordRaw) => !item.meta?.hidden)
}

/**
 * 将路由信息设置为菜单信息封装
 * @description 将路由信息转变为菜单信息<MenuOption>
 * @param route 路由信息
 * @returns {MenuOption} menuOption 菜单信息
 */
const getMenuOption = (route: RouteRecordRaw): MenuOption | undefined => {
  const routeInfo = isSingleChildren(route) ? route.children?.[0] : route
  const menuOption: MenuOption = {
    label: () => {
      if (routeInfo?.children && Array.isArray(routeInfo?.children)) {
        return routeInfo.name
      } else {
        return h(
          RouterLink,
          { to: { name: routeInfo?.name } },
          { default: () => routeInfo?.name }
        )
      }
    },
    key: routeInfo?.name as string,
    icon: routeInfo?.meta?.icon ? renderIcon(routeInfo?.meta?.icon as Component) : undefined,
  }
  if (routeInfo?.children && routeInfo.children.length > 0) {
    menuOption.children = getMenuOptions(routeInfo.children);
  }
  return menuOption;
}

/**
 * 将路由信息转变为菜单信息
 * @description 递归遍历路由，将其格式调整为菜单格式<MenuOption>
 * @param routes 路由信息
 * @returns {menuOption[]} menuOptions 菜单信息
 */

const getMenuOptions = (routes: RouteRecordRaw[]): MenuOption[] => {
  let menuOptions: MenuOption[] = []
  filterHiddenRouter(routes).forEach((route: RouteRecordRaw) => {
    if (!route.meta?.hidden) {
      const menuOption: MenuOption| undefined = getMenuOption(route)
      if (menuOption) {
        menuOptions.push(menuOption);
      }
    }
  })
  return menuOptions
}

export const useMenu = (): UseMenu => {
  const menus: MenuOption[] = getMenuOptions(routes)
  /**
   * 菜单选项
   */
  const menuOptions = ref(menus);

  /**
   * 展开的子菜单标识符数组
   */
  const expandKeys: Ref<string[]> = ref<string[]>([])
  /**
   * 当前菜单
   */
  const currentMenu: Ref<string> = ref<string>('')

  const route = useRoute()


  /**
   * 判断路由是否包含在菜单列表中
   * 
   * @param routeName 路由名称
   * @param menuList 菜单列表
   * @returns {boolean} 如果包含则返回true；否则返回false
   */
  const menuContains = (routeName: string, menuList: MenuOption[]): boolean => {
    for (let menu of menuList) {
      if (menu.key === routeName) {
        return true
      }
      if (menu.children && menu.children.length > 0) {
        const childMenuContains = menuContains(routeName, menu.children)
        if (childMenuContains) return true
      }
    }
    return false
  };
  /**
   * 路由变化时的回调函数
   */
  const routeChanged = (): void => {
    // 获取匹配到的路由列表
    const matched = route.matched
    // 获取匹配到的路由名称
    const matchNames = matched.filter((item) => menuContains(item.name as string, menus)).map((cItem) => cItem.name as string)
    const matchLen = matchNames.length
    const matchExpandKeys = matchNames.slice(0, matchLen - 1) // 获取展开的菜单
    const openKey = matchNames[matchLen - 1] // 获取当前打开的菜单
    expandKeys.value = matchExpandKeys
    currentMenu.value = openKey
  }

  /**
   * 更改子菜单标识符数组回调方法
   */
  const updateExpandKeys = (keys: string[]): void => {
    expandKeys.value = keys
  }

  /**
   * 选中的菜单发生改变
   */
  const updateValue = (key: string): void => {
    currentMenu.value = key
  }

  /**
 * 监听路由变化
 */
  watch(() => route.path, () => {
    routeChanged();
  },
    {
      immediate: true // 立即执行
    }
  );

  return {
    menuOptions,
    expandKeys,
    updateExpandKeys,
    currentMenu,
    updateValue
  } as UseMenu
}
