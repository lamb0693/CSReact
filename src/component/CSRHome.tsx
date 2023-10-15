import { Alert, Table } from "react-bootstrap"

export const CSRHome = () => {

    return (
        <>
            <Alert variant="primary">
                상담 대기 목록
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>고객 전화번호</th>
                        <th>내용</th>
                        <th>종류</th>
                        <th>생성날자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>내용물에 대해 문의 드려요</td>
                        <td>TEXT</td>
                        <td>2023-10-15 13:29</td>
                    </tr>
                </tbody>
            </Table>
        </>

    )
}