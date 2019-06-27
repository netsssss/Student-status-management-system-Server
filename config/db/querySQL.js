
var querySQL = {
    /** 登录 */
    loginSQL:"SELECT * FROM user WHERE username = ? AND password = ?",
    /** 查询所有省的名字 */
    provinceRetrieveSQL:"SELECT province_name FROM province",
    /** 根据省的名字查询所有省内所有市的名字 */
    cityRetrieveSQL:"SELECT city_name FROM city WHERE area_id in (SELECT province_id FROM province WHERE province_name = ?)",
    /** (已废弃) 根据省的名字查询所有省内所有学校的名字 */
    Discard_schoolRetrieveSQL:"SELECT school_name FROM school WHERE area_id IN (SELECT province_id FROM province WHERE province_name = ?)",
    /** (待完善) 根据市的名字查询所有市所在的省的省内所有学校的名字 */
    schoolRetrieveSQL:"SELECT school_name FROM school WHERE area_id IN (SELECT area_id FROM city WHERE city_name = ?)",
    /** (已废弃) 根据用户名查询用户所属的省的名字 */
    provinceUserRetrieveSQL:"SELECT belongprov FROM user WHERE username = ?",
    /** (已废弃) 根据用户名查询用户所属的省和市的名字 */
    cityUserRetrieveSQL:"SELECT belongprov,belongcity FROM user WHERE username = ?",
    /** (已废弃) 根据用户名查询用户所属的学校的名字 */
    schoolUserRetrieveSQL:"SELECT belongschool FROM user WHERE username = ?",
    /** 根据用户名查询用户角色，所属省，所属市，所属学校 */
    belongAreaRetrieveSQL:"SELECT role, belongprov, belongcity, belongschool FROM user WHERE username = ?",
    /** 根据学校名字查询该学校所有已选专业id和专业名字 */
    majorSchoolRetrieveSQL: "SELECT major_id, major_name FROM major WHERE 1=1",
    /** 所有学生入学年份 */
    admissionYearRetrieveSQL:"SELECT DISTINCT YEAR(create_time) as year FROM student_info WHERE 1=1",
    
    yhglCreateSQL:"INSERT INTO user(username,password,role,belongprov,belongcity,belongschool) VALUES (?,?,?,?,?,?)",
    yhglDeleteSQL:"DELETE FROM user WHERE username IN ( ? )",
    yhglUpdateSQL:"UPDATE user SET role = ?, belongprov = ?, belongcity = ?, belongschool = ? WHERE username = ?",
    /** 查询所有符合条件的用户的用户名和角色 */
    yhglRetrieveSQL:"SELECT username, role FROM user WHERE 1=1",

    yhgsRetrieveSQL:"SELECT username, role,belongprov,belongcity,belongschool FROM user WHERE 1=1",

    zykCreateSQL:"INSERT INTO major(major_id,major_name) VALUES (?,?)",
    zykRetrieveSQL:"SELECT major_id, major_name FROM major WHERE 1=1",

    zyglCreateSQL:"INSERT INTO ms(major_id,school_id) SELECT m.major_id, s.school_id FROM major AS m, school AS s WHERE m.major_id IN ( ? ) AND s.school_id IN ( SELECT school_id FROM school WHERE school_name IN ( SELECT belongschool FROM user WHERE username = ? ) )",
    zyglRetrieveSQL:"SELECT major_id, major_name FROM major WHERE major_id IN ( SELECT major_id FROM ms WHERE school_id IN ( SELECT school_id FROM school WHERE school_name IN ( SELECT belongschool FROM user WHERE username = ? )))",
    
    xsxxCreateSQL:"INSERT INTO student_info(name,sex,imageUrl,id_card,birth,school,major,birthplace,birthplace_detail,regist,unusual_action) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    xsxxRetrieveSQL:"SELECT * FROM student_info WHERE 1=1",

    xjzmUpdateSQL:"UPDATE student_info SET regist = ? WHERE id_card IN ( ? )",

    xjydCreateSQL:"INSERT INTO unusual_action(id,id_card,ua_type,ua_date,ua_state,ua_describe,old_major,new_major) VALUES (id,?,?,?,?,?,?,?)",
    xjydCityUpdateSQL:"UPDATE unusual_action SET ua_state = ? WHERE id = ?",
    xjydProvinceUpdateSQL:"UPDATE unusual_action AS u,student_info AS s SET u.ua_state = ?, u.ua_date = ?, s.major = ?, s.unusual_action = ? WHERE u.id =? AND u.id_card = ? AND u.id_card = s.id_card",
    xjydRetrieveSQL:"SELECT * FROM unusual_action WHERE 1=1",

    /** 查询所有学生信息 */
    xxtjRetrieveSQL:"SELECT * FROM student_info WHERE 1=1",
}

module.exports=exports=querySQL;