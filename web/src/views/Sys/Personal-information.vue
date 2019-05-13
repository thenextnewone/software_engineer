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
			<el-form-item label="学号" prop="id">
				<el-input v-model="dataForm.id" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="dataForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-input v-model="dataForm.sex" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="生日" prop="birthdate">
				<el-input v-model="dataForm.birthdate" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="政治面貌" prop="politicalStatus">
				<el-input v-model="dataForm.politicalStatus" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="班级" prop="classno">
				<el-input v-model="dataForm.classno" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="学院" prop="collegeId">
				<el-input v-model="dataForm.collegeId" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="毕业学校" prop="graduatedSchool">
				<el-input v-model="dataForm.graduatedSchool" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phoneNumber">
				<el-input v-model="dataForm.phoneNumber" auto-complete="off"></el-input>
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
			size: 'small',
			filters: {
				label: ''
			},
			columns: [
				{prop:"id", label:"学号", minWidth:100},
				{prop:"name", label:"姓名", minWidth:100},
				{prop:"sex", label:"性别", minWidth:100},
				{prop:"birthdate", label:"生日", minWidth:100},
				{prop:"politicalStatus", label:"政治面貌", minWidth:100},
				{prop:"classno", label:"班级", minWidth:100},
				{prop:"collegeId", label:"学院", minWidth:100},
				{prop:"graduatedSchool", label:"毕业学校", minWidth:100},
				{prop:"phoneNumber", label:"电话", minWidth:100},
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
				name: null,
				sex: null,
				birthdate: null,
				politicalStatus: null,
				classno: null,
				collegeId: null,
				graduatedSchool: null,
				phoneNumber: null,
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
            this.$axios.post('/page/student-information',this.pageRequest).then((res) => {
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
				name: null,
				sex: null,
				birthdate: null,
				politicalStatus: null,
				classno: null,
				collegeId: null,
				graduatedSchool: null,
				phoneNumber: null,
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params.row)
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
		findPage()
	}
}
</script>

<style scoped>
</style>