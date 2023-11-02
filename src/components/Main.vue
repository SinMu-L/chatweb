<script setup>
import { reactive, h } from 'vue';
import { NLayout, NLayoutSider, NLayoutHeader,NLayoutContent, NLayoutFooter, NIcon, NMenu, NButton } from 'naive-ui';
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
    CashOutline as CashIcon
} from '@vicons/ionicons5'

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
function tmp(){
    console.log('123...');
}

const menuOptions = reactive([
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: renderIcon(BookIcon)
    },
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: renderIcon(BookIcon)
    },
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: renderIcon(BookIcon)
    },
    {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        icon: renderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: '鼠',
                key: 'rat'
            }
        ]
    },
    {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
        icon: renderIcon(BookIcon)
    },
    {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        icon: renderIcon(BookIcon),
        children: [
            {
                type: 'group',
                label: '人物',
                key: 'people',
                children: [
                    {
                        label: '叙事者',
                        key: 'narrator',
                        icon: renderIcon(PersonIcon)
                    },
                    {
                        label: '羊男',
                        key: 'sheep-man',
                        icon: renderIcon(PersonIcon)
                    }
                ]
            },
            {
                label: '饮品',
                key: 'beverage',
                icon: renderIcon(WineIcon),
                children: [
                    {
                        label: '威士忌',
                        key: 'whisky'
                    }
                ]
            },
            {
                label: '食物',
                key: 'food',
                children: [
                    {
                        label: '三明治',
                        key: 'sandwich'
                    }
                ]
            },
            {
                label: '过去增多，未来减少',
                key: 'the-past-increases-the-future-recedes'
            }
        ]
    }
])
</script>

<template>
    <n-layout has-sider class="main">
        <n-layout-sider content-style="padding: 6px;" collapse-mode="width" :collapsed-width="80" :width="240"
            show-trigger="arrow-circle" :native-scrollbar="true" :bordered="true"
            :on-update:collapsed="tmp"
            >
            <n-layout>

                <n-button class="add-menu">
                    <template #icon>
                        <n-icon>
                            <cash-icon></cash-icon>
                        </n-icon>
                    </template>
                    <span>Default</span>
                </n-button>
            </n-layout>
            <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />

        </n-layout-sider>
        <n-layout class="left-area">
            <n-layout-header>颐和园路</n-layout-header>
            <n-layout-content content-style="padding: 24px;">
                平山道
            </n-layout-content>
            <n-layout-footer>成府路</n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<style scoped>
.add-menu {
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;

}

.main {
    height: 100vh;
}

.n-layout-header,
.n-layout-footer {
    background: rgba(128, 128, 128, 0.2);
    padding: 24px;
}

.n-layout-sider {
    /* background: rgba(128, 128, 128, 0.3); */
}

.n-layout-content {
    background: rgba(128, 128, 128, 0.4);
}
</style>