import React from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell.tsx'
import { Student } from './types.ts'
import { EditCell } from './EditCell.tsx'

const columnHelper = createColumnHelper<Student>()

export const columns = [
  columnHelper.accessor('studentNumber', {
    header: 'Student Id',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('name', {
    header: 'School Name',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true,
      pattern: '^[a-zA-Z ]+$',
    },
  }),
  columnHelper.accessor('board', {
    header: 'Board',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: '', label: 'Select' },
        { value: 'CBSE', label: 'centeral board of secondary exam' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Business', label: 'Business' },
        { value: 'Psychology', label: 'Psychology' },
      ],
      required: true,
    },
  }),
  columnHelper.accessor('medium', {
    header: 'Medium',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: '', label: 'Medium' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'english', label: 'English' },
      ],
      required: true,
    },
  }),
  columnHelper.accessor('class', {
    header: 'Class',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: '', label: 'Class' },
        { value: 'Class I', label: 'Class I' },
        { value: 'ClassII', label: 'Class II' },
        { value: 'Class III', label: 'Class III' },
        { value: 'Class IV', label: 'Class IV' },
      ],
      required: true,
    },
  }),
  
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]