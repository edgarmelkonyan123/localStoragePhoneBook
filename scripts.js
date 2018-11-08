window.onload = function () {
    Vue.use(VueLocalStorage);
    new Vue({
        el: '#app',
        data() {
            return {
                entry: {
                    fullName: null,
                    telephone: null,
                    edit: false
                },
                phonebook: null || [],
            }
        },
        watch: {
            phonebook: function (val) {
                this.$ls.set('phonebook', val)
            }
        },
        mounted() {
            this.phonebook = this.$ls.get('phonebook', this.phonebook);
            let _this = this;
            this.$ls.on('phonebook', function (val) {
                _this.phonebook = val;
            });
        },
        methods: {
            addEntry() {
                let vm = this
                vm.phonebook.push({fullName: vm.entry.fullName, telephone: vm.entry.telephone, edit: false})
                vm.entry.fullName = ''
                vm.entry.telephone = ''
            },
            editEntry(index) {
                let vm = this
                let entry = vm.phonebook[index]
                entry.edit = !entry.edit
                if(!entry.edit) {
                    vm.$ls.set('phonebook', vm.phonebook)
                }
            },
            removeEntry(index) {
                this.phonebook.splice(index, 1)
            }
        }
    })
}
