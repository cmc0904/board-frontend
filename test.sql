
WITH RECURSIVE cte AS (
    SELECT 1 AS lv,
            hh.idx,
            hh.title,
            hh.article,
            hh.email,
            hh.writer,
            hh.replyIdx,
            hh.isNotice,
            hh.isPrivate,
            hh.createAt,
            hh.boardView,
            CONCAT(hh.createAt, '|', CAST(hh.idx AS CHAR(99)) ) AS x
    FROM stn_boards hh
    WHERE hh.replyIdx IS NULL AND hh.isNotice = 0
    UNION ALL
    SELECT b.lv + 1 AS lv,
            p.idx,
            p.title,
            p.article,
            p.email,
            p.writer,
            p.replyIdx,
            p.isNotice,
            p.isPrivate,
            p.createAt,
            p.boardView,
            CONCAT(b.x, '-', p.idx) AS x
    FROM stn_boards p
                INNER JOIN cte b ON IFNULL(p.replyIdx, 0) = b.idx
)

SELECT
    board.idx AS boardIdx,
    board.title AS boardTitle,
    board.article AS boardArticle,
    board.email AS boardWriterEmail,
    COUNT(DISTINCT files.idx) AS fileCount,
    board.writer AS writer,
    board.createAt AS createAt,
    board.isNotice AS isNotice,
    board.isPrivate AS isPrivate,
    IF(DATE_FORMAT(board.createAt, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d'), 1, 0) AS isNewBoard,
    COUNT(DISTINCT comments.idx) AS commentCount,
    board.boardView,
    board.lv AS depth,
    board.replyIdx,
    board.x
FROM
    cte board
        LEFT JOIN stn_files files ON board.idx = files.boardIdx
        LEFT JOIN stn_comments comments ON board.idx = comments.boardIdx
WHERE
    1 = 1
    <if test='"TITLE".equals(searchType)'>
        AND board.title like CONCAT('%',#{content},'%')
    </if>

    <if test='"TITLE_CONTENT".equals(searchType)'>
        AND (board.title like CONCAT('%',#{content},'%')
        OR board.article like CONCAT('%',#{content},'%'))
    </if>

    <if test='"WRITER".equals(searchType)'>
        AND board.writer like CONCAT('%',#{content},'%')
    </if>

    <if test='startDate != null and endDate != null'>
        AND board.createAt between #{startDate} and #{endDate}
    </if>
GROUP BY
    board.idx,
    board.title,
    board.article,
    board.email,
    board.writer,
    board.createAt,
    board.isNotice,
    board.isPrivate,
    board.boardView,
    board.lv,
    board.X,
    board.replyIdx
ORDER BY 
	SUBSTRING_INDEX(board.X, '|', 1) DESC, SUBSTRING_INDEX(board.X, '|', 2)
LIMIT 10 OFFSET #{offset}
