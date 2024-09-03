<template>
    <div>
        <v-navigation-drawer v-model="drawer" app temporary :clipped="$vuetify.breakpoint.lgAndUp" class="drawer">
            <div class="logo-drewer">
                <img src="../assets/logo1.png" alt="Logo" />
            </div>
            <v-list>
                <v-list-item v-for="item in navItems" :key="item.name" @click="navigate(item.path)">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <div app class="appbar">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="drawer-icon" style="color: #ffffff; display: show" />
            <v-toolbar-title class="d-none d-sm-block">
                <div class="logo-nav">
                    <img src="../assets/logo1.png" alt="Logo" />
                </div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="nav-btn-list">
                <ul>
                    <li v-for="item in navItems" :key="item.name">
                        <v-btn class="btn1 " plain :class="{ active: isActive(item.path) }" @click="navigateTo(item.path)"
                            :key="item.name" :to="item.path">
                            <router-link :to="item.path" class="btn1" exact-active-class="active" >
                                {{ item.name }}
                            </router-link>
                        </v-btn>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    // name: navbar
    data() {
        return {
            drawer: false,
            navItems: [
                { name: "Home", path: "/" },
                { name: "About us", path: "/about" },
                { name: "Our Products", path: "/ourproduct" },
                { name: "Contact", path: "/contact" },
            ],
            activePath: this.$route.path,
        };
    },
    watch: {
        "$route.path": function (newPath) {
            this.setActive(newPath);
        },
    },
    methods: {
        setActive(path) {
            this.activePath = path;
        },
        isActive(path) {
            return this.activePath === path;
        },
        navigate(path) {
            if (this.$route.path !== path) {
                this.$router.push(path);
            }
            this.drawer = false;
            this.setActive(path);
        },
    },
}
</script>

<style lang="scss" scoped>
.appbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}


.btn1 a.active {
    color: #f5821f;
    font-weight: 700;
    // padding: 10%;

}

.btn1 a {
    font-family: "Noto Sans Lao Looped", sans-serif;
    font-size: 18px;
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
    text-transform: none;
    padding: 15% 20%;
}

.nav-btn-list ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.nav-btn-list ul li {
    margin-right: 3%;
}

.logo-nav {
    margin-left: 5%;
}

.logo-drewer img {
    width: 150px;
    height: auto;
}

.logo-nav img {
    width: 150px;
    height: auto;
}

.nav-btn-list {
    margin-right: 8%;
}

.drawer-icon {
    display: none;
}

.drawer {
    z-index: 100;
    background-color: rgb(236, 236, 236);
}

@media (max-width: 768px) {
    .logo-nav img {
        width: 100px;
    }

    .btn1 {
        display: none;
    }

    .drawer-icon {
        display: block;
    }
}
</style>