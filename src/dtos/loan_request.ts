export interface LoanRequestWithStatusUserName {
  id_loan_request: number;
  id_reader: number;
  status_id: number;
  create_at: string;
  expected_date: string;
  user: {
    name: string;
  };
  status: {
    name: string;
    id: number;
  };
  loan_request_list_documents: {
    document?: {
      document_name: string;
      document_id: string;
    };
  }[];
}
export interface LoanRequestForItem {
  id_loan_request: number;
  id_reader: number;
  status_id: number;
  create_at: string;
  expected_date: string;
  user: {
    name: string;
    job_title: {
      job_title_name: string;
    };
  };
  status: {
    name: string;
    id: number;
  };

  loan_request_list_documents: {
    document?: {
      document_name: string;
      document_id: string;
    };
    quantity: number;
  }[];
}
export interface LoanRequestWithVariants {
  id_loan_request: number;
  id_reader: number;
  status_id: number;
  create_at: string;
  expected_date: string;
  transaction_id?: number;
  user: {
    name: string;
  };
  status: {
    name: string;
    id: number;
  };
  loan_request_list_documents: {
    document?: {
      document_name: string;
      document_id: number;
      variants: {
        isbn: string;
        name: string;
        quantity: number;
      }[];
    };

    quantity: number;
  }[];
}
