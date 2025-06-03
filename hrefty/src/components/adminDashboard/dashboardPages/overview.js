import React, { useEffect, useState } from "react";
import "../../../style/adminDashboard/dashboardPages/overview.scss";

const Overview = () => {
  return (
    <div className="Overview">
      <div className="statistiques">
        <div className="row">
          <p>عدد العملاء:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد الحرفيين:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد الطلبات:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد العروض:</p> <span>0</span>
        </div>
      </div>
      <div className="ads">
        <div className="add_ads">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="رابط الاعلان"
            />
            <input type="file" className="form-control" />
            <button className="btn btn-primary">رفع</button>
          </form>
        </div>
        <div className="list_ads">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>الاعلان</th>
                <th>الحالة</th>
                <th>رابط الاعلان</th>
                <th>اجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="img">
                  <img src="imgs/images.jpeg" alt="" />
                </td>
                <td className="status">مفعل</td>
                <td className="path">https://facebook.com</td>
                <td className="buttons">
                  <button className="btn btn-primary">تعليق</button>
                  <button className="btn btn-primary">رفع</button>
                  <button className="btn btn-primary">خذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
