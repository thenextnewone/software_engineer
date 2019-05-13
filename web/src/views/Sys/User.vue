<template>
  <div class="container">
	<!--工具栏-->
	<div class="toolbar">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.label" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button :label="t.search" perms="sys:student:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="t.add" perms="sys:student:view" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table class="table" permsEdit="sys:student:view" permsDelete="sys:student:view"
		:data="pageResult" :columns="columns" 
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="id" prop="id">
				<el-input v-model="dataForm.id" auto-complete="off" :disabled="!operation"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="bz">
				<el-input v-model="dataForm.bz" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="true_name">
				<el-input v-model="dataForm.true_name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="user_name">
				<el-input v-model="dataForm.user_name" auto-complete="off" :disabled="!operation"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="dataForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="roles">
				<el-select v-model="operation?zero:dataForm.roles" multiple placeholder="请选择" style="width: 100%;">
						<el-option v-for="item in roles" :key="item.id" :label="item.remark" :value="item.id">
						</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-input v-model="dataForm.sex" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="入校时间" prop="workingtime">
				<el-input v-model="dataForm.workingtime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="政治面貌" prop="political">
				<el-input v-model="dataForm.political" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="学院" prop="collegeid">
				<el-input v-model="dataForm.collegeid" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="班级" prop="classno">
				<el-input v-model="dataForm.classno" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="毕业学校" prop="graduate">
				<el-input v-model="dataForm.graduate" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="phone">
				<el-input v-model="dataForm.phone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="籍贯" prop="nativeplace">
				<el-input v-model="dataForm.nativeplace" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{t.cancel}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{t.submit}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components:{
			KtTable,
			KtButton
	},
	data() {
		return {
			zero:"",
			id:"",
			roles:[{
				id:"1",
				name:"admin",
				remark:"管理员"
			},{
				id:"2",
				name:"teacher",
				remark:"老师"
			},{
				id:"3",
				name:"student",
				remark:"学生"
			}],
			size: 'small',
			filters: {
				label: ''
			},
			columns: [
				{prop:"id", label:"ID", minWidth:100},
				{prop:"user_name", label:"用户名", minWidth:100},
				{prop:"password", label:"密码", minWidth:100},
				{prop:"true_name", label:"姓名", minWidth:100},
				{prop:"bz", label:"备注", minWidth:100},
				{prop:"role", label:"角色", minWidth:100}
			],
			pageRequest: { pageNum: 1, pageSize: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				label: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: null,
				bz: null,
				true_name: null,
				user_name: null,
				password: null,
				sex: null,
				workingtime: null,
				political: null,
				collegeid: null,
				classno:null,
				graduate:null,
				phone:null,
				nativeplace:null,
				roles:[]
				},
				t:this.$store.state.action
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {label: {name:'label', value:this.filters.label}}
			// this.$api.student.findPage(this.pageRequest).then((res) => {
			// 	this.pageResult = res.data
            // }).then(data!=null?data.callback:'')
            this.$axios.post('/page/user-information',this.pageRequest).then((res) => {
				console.log(res.data)
                this.pageResult = res.data
            }).then(data != null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			console.log(data.params)
			this.$axios.delete("/student/delete",data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: null,
				bz: null,
				true_name: null,
				user_name: null,
				password: null,
				sex: null,
				workingtime: null,
				political: null,
				collegeid: null,
				classno:null,
				graduate:null,
				phone:null,
				nativeplace:null,
				roles:[]
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			let obj = Object.assign({},params.row)
			this.id = obj.id
			this.$axios.post('/user/information',obj.id).then((res) => {
				this.dataForm = res.data.data
				for(let i = 0;i<obj.role.length;i++){
					this.dataForm.roles[i] = this.pageResult.content[obj.id].roleId[i]
				}
				console.log(this.dataForm)
			})
			console.log(this.dataForm)
		},
		// 编辑
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						console.log(params)
						this.$axios.post("/student/update",params).then((res) => {
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
							} else {
								this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
							this.findPage(null)
						})
					})
				}
			})
		},
		// 时间格式化
      	dateFormat: function (row, column, cellValue, index){
          	return format(row[column.property])
      	}
	},
	mounted() {
	}
}
</script>

<style scoped>
</style>