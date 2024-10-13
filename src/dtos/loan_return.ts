export interface LoanReturnItem {
  id_loan_return: number;
  id_reader: number;
  id_punish?: number;
  return_date?: string;
  id_librarian: number;
  create_at: string;
  due_date: string;
  user: {
    name: string;
  };
  loan_list_document: {
    variant: {
      document: {
        document_name: string;
      };
    };
  }[];
}
export interface LoanReturnItemDetail {
  id_loan_return: number;
  id_reader: number;
  id_punish?: string;
  return_date?: string;
  id_librarian: number;
  due_date: string;
  create_at: string;
  librian: {
    name: string;
    id_user: number;
  };
  loan_list_document: {
    variant: {
      document: {
        document_name: string;
      };
      isbn: string;
    };
    quantity: number;
    note: string;
  }[];
  punishment?: {
    id_punish: number;
    reason: string;
    is_handled: boolean;
    cost: number;
  };
  user: {
    name: string;
    id_user: number;
  };
}
