import {
  schoolTypeEnum,
  schoolPropertiesEnum,
  schoolAttributeEnum,
} from '@/utils/useEnums';
export function createInfoWindowTemplate(result) {
  // 使用可选链保证对象为 undefined 时不会报错，而是返回undefined
  // 办学类型tag
  let runningType = schoolTypeEnum.find(
    (item) => item.schoolType === Number(result.runningType)
  )?.describe;
  // 办学性质tag
  let schoolProperties = schoolPropertiesEnum.find(
    (item) => item.value === Number(result.schoolProperties)
  )?.describe;
  // 学校属性tag
  let schoolAttribute = schoolAttributeEnum.find(
    (item) => item.value === Number(result.schoolAttribute)
  )?.describe;
  return `
  <div class="map-info-window">
  <div class="info-window-title">${result.schoolName || '-'}</div>
  <div class="info-window-content">
    <div class="tags">
      <span class="tags-purple ${runningType ? '' : 'none'}">
        ${runningType}
      </span>
      <span class="tags-blue ${schoolProperties ? '' : 'none'}">
        ${schoolProperties}
      </span>
      <span class="tags-pink ${schoolAttribute ? '' : 'none'}">
        ${schoolAttribute}
      </span>
    </div>

    <div class="tags ${Object.keys(result).length > 0 ? '' : 'none'}">
      <span class="tags-green ${result.officeType !== null ? '' : ' none'}"> 
        ${result.officeType == '1' ? '市属集团' : '区属集团'}
      </span>
      <span class="tags-red ${result.isCroeSchool == '1' ? '' : 'none'}">
        核心校
      </span>
      <span class="tags-orange">
        ${result.officeName ? result.officeName : '非教育集团'}
      </span>
    </div>

    
    <div class="tags">
      <span class="tags-purple ${
        Number(result.exemplaryType) > 0 ? '' : 'none'
      }">
        ${result.exemplaryType == '1' ? '市示范性高中' : ''}
        ${result.exemplaryType == '2' ? '省示范性高中' : ''}
        ${result.exemplaryType == '3' ? '省/市示范性高中' : ''}
      </span>
      <span class="tags-pink ${
        result.examSiteType === '0' || !result.examSiteType ? 'none' : ''
      }">
        ${
          result.examSiteType
            ? result.examSiteType.split(',').includes('1')
              ? '成人高考'
              : ''
            : ''
        }
        ${
          result.examSiteType
            ? result.examSiteType.split(',').includes('2')
              ? '教资考试'
              : ''
            : ''
        }
        ${
          result.examSiteType
            ? result.examSiteType.split(',').includes('3')
              ? '自考'
              : ''
            : ''
        }
      </span>
      <span class="tags-blue ${result.isMemberSchool == 0 ? 'none' : ''}">
        ${result.isCroeSchool == 1 ? '非成员校' : '成员校'}
      </span>
    </div>

    <div class="info-window-infos ${
      Object.keys(result).length > 0 ? '' : 'none'
    }">
    <div>
      <span> 学校地址:</span>  &nbsp;
      <span class="">${result.address || '暂无数据'}</span>
    </div>
    <div>
      <span> 学生数:</span>  &nbsp;
      <span class="number">${result.studentTotal || 0}</span>  &nbsp;人
    </div>
    <div>
      <span> 教职工数:</span>  &nbsp;
      <span class="number">${result.teacherTotal || 0}</span>  &nbsp;人
    </div>
    <div>
      <span> 班级数:</span>  &nbsp;
      <span class="number">${result.classTotal || 0}</span>  &nbsp;个
    </div>
    <div>
      <span> 住宿总数:</span>  &nbsp;
      <span class="number">${result.totalAccommodation || 0}</span>  &nbsp;人
    </div>
    <div style="display:none">
      <span> 最大学位数:</span>  &nbsp;
      <span class="number">${result.maxDegreeTotal || 0}</span>  &nbsp;人
    </div>
    <div style="display:none">
      <span> 标准学位数:</span>  &nbsp;
      <span class="number">${result.standardDegreeTotal || 0}</span>  &nbsp;人
    </div>

  </div>
  </div>
  <div class="arrow"></div>
</div>
  
  `;
}
let tmp = `
    <div>
      <span> 教室数:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 宿舍数:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 图书馆:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 理化生实验室:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 计算机室:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 音乐美术舞蹈室:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>
    <div>
      <span> 操场:</span>  &nbsp;
      <span class="number">0</span>  &nbsp;
    </div>

`

export function createExamWindowTemplate(result) {
  let template = '';
  if (result.examSiteType === '1') {
    template = `
            <div class="map-info-window" style="padding-bottom: 10px;padding-right: 10px;">
            <div class="info-window-title">${result.name}</div>
              <div class="info-window-content">
                <p>考点地址：${result.address || '暂无'}</p>
                <p>考试类型：${
                  result.examType == '0' ? '专升本' : result.examType
                }</p>
                <p>考生数：${result.numberExaminees || 0}</p>
                <p>考场数：${result.numberExaminationRooms || 0}</p>
              </div>
              <div class="arrow"></div>
            </div>
            `;
  } else if (result.examSiteType === '2') {
    template = `
            <div class="map-info-window" style="padding-bottom: 10px;padding-right: 10px;">
            <div class="info-window-title">${result.name}</div>
              <div class="info-window-content">
                <p>考点代码：${result.examinationSiteCode || '暂无'}</p>
                <p>考点地址：${result.address || '暂无'}</p>
                <p>考生人数：${result.numberExaminees || 0}</p>
                <p>科次：${result.section || '暂无'}</p>
                <p>最大考场数：${result.maxNumberExamRooms || 0}</p>
                <p>第一段考场数：${result.oneNumberExamRooms || 0}</p>
                <p>第二段考场数：${result.twoNumberExamRooms || 0}</p>
                <p>第三段考场数：${result.threeNumberExamRooms || 0}</p>
                <p>备用隔离考场数：${
                  result.numberSpareIsolatedExamRooms || 0
                }</p>
              </div>
              <div class="arrow"></div>
            </div>
            `;
  } else if (result.examSiteType === '3') {
    template = `
            <div class="map-info-window" style="padding-bottom: 10px;padding-right: 10px;">
            <div class="info-window-title">${result.name}</div>
              <div class="info-window-content">
                <p>考点地址：${result.address || '暂无'}</p>
                <p>最高考场数：${result.maxNumberExamRooms || 0}</p>
                <p>考场描述：${result.coment || '暂无'}</p>
                <p>采集核酸医务人员数量：${result.numberMedicalStaff || 0}</p>
              </div>
              <div class="arrow"></div>
            </div>
            `;
  } else if (result.examSiteType === '4') {
    template = `
          <div class="map-info-window" style="padding-bottom: 10px;padding-right: 10px;">
            <div class="info-window-title">${result.name}</div>
            <div class="info-window-content">
              <p>考点地址：${result.address || '暂无'}</p>
              <p>考点电话：${result.examPointTelephone || '暂无'}</p>
              <p>主考姓名：${result.examinerName || ''}</p>
              <p>主考电话：${result.examinerTelephone || '暂无'}</p>
              <p>考点时间段：${result.coment || ''}</p>
              <p>考场数量：${result.numberExaminationRooms || 0}</p>
            </div>
            <div class="arrow"></div>
          </div>
            `;
  } else if (result.examSiteType === '5') {
    template = `
          <div class="map-info-window" style="padding-bottom: 10px;padding-right: 10px;">
            <div class="info-window-title">${result.name}</div>
            <div class="info-window-content">
              <p>考点地址：${result.address || '暂无'}</p>
              <p>考点电话：${result.examPointTelephone || '暂无'}</p>
              <p>主考姓名：${result.examinerName || '暂无'}</p>
              <p>主考电话：${result.examinerTelephone || '暂无'}</p>
              <p>考务联系电话：${result.examAffairsTelePhone || '暂无'}</p>
              <p>考点时间段：${result.coment || '暂无'}</p>
              <p>考场数量：${result.numberExaminationRooms || 0}</p>
              <p>考生数量：${result.numberExaminees || 0}</p>
              <p>安检门个数：${result.numberOfSecurityGates || '暂无'}</p>
              <p>供电线路：${result.powerSupplyLine || '暂无'}</p>
              <p>街道：${result.street || '暂无'}</p>
            </div>
            <div class="arrow"></div>
          </div>
            `;
  }

  return template;
}
