import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataTable } from "./datatable";
import { DefaultSorter } from "./default-sorter";
import { Paginator } from "./paginator";
import { BootstrapPaginator } from "./bootstrap-paginator";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DataTable,
        DefaultSorter,
        Paginator,
        BootstrapPaginator
    ],
    exports: [
        DataTable,
        DefaultSorter,
        Paginator,
        BootstrapPaginator
    ]
})
export class DataTableModule {

}