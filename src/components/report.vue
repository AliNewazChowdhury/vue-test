<template>
  <div id="contact_table_wrapper" class="row justify-items-center">
    <div class="col-md-6">
      <div class="col-sm-7">
        <div class="dt-buttons btn-group">
          <a @click="xlsxReport" class="btn btn-default buttons-excel buttons-html5 btn-sm" tabindex="0" aria-controls="contact_table" href="#">
            <span><i class="fa fa-file-excel" aria-hidden="true"></i> Export to Excel</span>
          </a>
          <a @click="getPdf" class="btn btn-default buttons-pdf buttons-html5 btn-sm" tabindex="0" aria-controls="contact_table" href="#">
            <span><i class="fa fa-file-pdf" aria-hidden="true"></i> Export to PDF</span>
          </a>
        </div>
      </div>
      <table
        class="table table-bordered table-striped dataTable"
        style="width: 600px; height:150px;">
        <thead>
          <tr>
            <th @click="sort('Book ID')">Book ID <font-awesome-icon :class="{'up' : currentSort === 'Book ID' && currentSortDir == 'asc'  }"  :icon="['fas', 'arrow-alt-circle-down']" /> </th>
            <th @click="sort('Book Name')">Book Name<font-awesome-icon style="margin-left:3px;" :class="{'up' : currentSort === 'Book Name' && currentSortDir == 'asc'  }" :icon="['fas', 'arrow-alt-circle-down']" /></th>
            <th @click="sort('Category')">Category <font-awesome-icon :class="{'up' : currentSort === 'Category' && currentSortDir == 'asc' }" :icon="['fas', 'arrow-alt-circle-down']"/></th>
            <th @click="sort('Price')">Price <font-awesome-icon :class="{'up' : currentSort === 'Price' && currentSortDir == 'asc' }" :icon="['fas', 'arrow-alt-circle-down']"/></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in sorted" :key="book['Book ID']">
            <td>{{book['Book ID']}}</td>
            <td>{{book['Book Name']}}</td>
            <td>{{book['Category']}}</td>
            <td>{{book['Price']}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  name: 'Sorting',
  data: () => ({
    books: [
      {
        'Book ID': '1',
        'Book Name': 'Challenging Times',
        'Category': 'Business',
        'Price': '125.60'
      },
      {
        'Book ID': '2',
        'Book Name': 'Learning JavaScript',
        'Category': 'Programming',
        'Price': '56.00'
      },
      {
        'Book ID': '3',
        'Book Name': 'Popular Science',
        'Category': 'Science',
        'Price': '210.40'
      }
    ],
    currentSort:'Book ID',
    currentSortDir:'asc'
  }),
  computed:{
    sorted() {
      return this.books.sort((a,b) => {
        console.log(this.currentSort);
        console.log(a[this.currentSort]+' '+(b[this.currentSort]));
        console.log(parseFloat(a[this.currentSort]) < parseFloat(b[this.currentSort]));
        console.log(a[this.currentSort] < b[this.currentSort]);
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if (this.isFloat(a[this.currentSort]) && this.isFloat(b[this.currentSort])) {
          if( parseFloat(a[this.currentSort]) < parseFloat(b[this.currentSort]) ) return -1 * modifier;
          if( parseFloat(a[this.currentSort]) > parseFloat(b[this.currentSort])) return 1 * modifier;
        } else {
          if( a[this.currentSort] < b[this.currentSort] ) return -1 * modifier;
          if( a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        }
        return 0;
      })
    }
  },
  methods: {
    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    },
    sort(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    xlsxReport () {
      const data = XLSX.utils.json_to_sheet(this.books)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb, 'report.xlsx')
    },
    getPdf () {
      let doc = new jsPDF()
      let col = [
        'Book ID',
        'Book Name',
        'Category',
        'Price'
      ]
      let rows = []

      /* The following array of object as response from the API req  */

      this.books.forEach(element => {
        let temp = [element['Book ID'], element['Book Name'], element['Category'], element['Price']]
        rows.push(temp)
      })

      doc.autoTable(col, rows, { startY: 10 })
      doc.save('report.pdf')
    }
  }
}
</script>

<style scoped>
:root{
  --colorHead:rgb(25, 27, 151);
  --filaPar:#e1e6f8;
  --filaImpar:#c3cdff;
  --colorBorde:#a8afcc;

}
.vt-sort:before{
    font-family: FontAwesome;
    padding-right: 0.5em;
    width: 1.28571429em;
    display: inline-block;
    text-align: center;
}

.vt-sortable:before{
    content: "\f0dc";
}

.vt-asc:before{
    content: "\f160";
}

.vt-desc:before{
    content: "\f161";
}
.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.btn-group>.btn:first-child {
    margin-left: 0;
}
.btn-group-vertical>.btn, .btn-group>.btn {
    position: relative;
    float: left;
}
.btn-default {
    background-color: #f4f4f4;
    color: #444;
    border-color: #ddd;
}
.btn {
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid transparent;
}
.btn-group-sm>.btn, .btn-sm {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
}
div.dataTables_scrollHead table.table-bordered {
    border-bottom-width: 0;
}
div.dataTables_scrollHead table.dataTable {
    margin-bottom: 0!important;
}
table.dataTable {
    clear: both;
    margin-top: 6px!important;
    margin-bottom: 6px!important;
    max-width: none!important;
}
.w-50{
  width: 50%;
}

table,tfoot{
  border:1px solid #a8afcc;
  word-break: break-all;

}

table:nth-of-type(1) caption {
  font-weight: 800;
}


table {
  border-collapse: collapse;
  border-spacing:1rem 0.1rem;
  table-layout:fixed;/*auto viene por defecto*/
  width: 100%;
  empty-cells: hide;
}

thead{
  color:white;
  background:rgb(25, 27, 151);
}

table tbody tr:not(tfoot):nth-child(odd) {
	background: #e1e6f8;
}
table tbody tr:nth-child(even) {
	background: #c3cdff;
}

tr:not(.tr-head):hover{
  background:rgb(130, 130, 130);
}
td:hover{
  background:rgb(126, 126, 126);

}
td{
  text-align: center;
}

th{
  text-align:center;
  cursor: pointer;
  height: 20px;
}
.up {
  transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
}
</style>
